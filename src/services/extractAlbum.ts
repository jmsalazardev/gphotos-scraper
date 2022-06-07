import { Album } from '../interfaces';
import { getAlbum } from './getAlbum';
import { AlbumNotFoundException } from '../exceptions';
import { getPhotos } from './getPhotos';

export const extractAlbum = async (albumUrl: string): Promise<Album> => {
  const gAlbum = await getAlbum(albumUrl);
  if (!gAlbum) throw new AlbumNotFoundException();

  const { items, key, id, title } = gAlbum;

  const itemsMap = items.reduce((map, item) => map.set(item.id, item.url), new Map<string, string>());

  const album: Album = {
    id,
    title,
    url: albumUrl,
    photos: [],
  };

  const chunkSize = 500;
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const ids = chunk.map((el) => el.id);
    const photosInfo = await getPhotos(key, ids);
    album.photos.push(...photosInfo.map((el) => {
      const url = itemsMap.get(el.id) || '';
      return {...el, url};
    }));
  }

  album.photos.sort((a, b) => b.createdAt - a.createdAt);
  return album;
}