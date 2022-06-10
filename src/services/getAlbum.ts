import { load } from 'cheerio';
import axios, { AxiosError } from 'axios';
import { GoogleAlbum } from '../interfaces';
import { AlbumNotFoundException } from '../exceptions';

const RPCID = 'snAcKc';

export const getData = async (
  id: string,
  key: string,
  token?: string,
): Promise<GoogleAlbum> => {
    
  const queryData = [
    [RPCID, JSON.stringify([id, token, null, key])]
  ];

  let data;
  const bodyData = `f.req=${JSON.stringify([queryData])}`;
  try {
    const res = await axios.post(
      'https://photos.google.com/_/PhotosUi/data/batchexecute',
      bodyData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    data = res.data.replace(')]}\'', '');

  } catch (error: unknown) {
      if (error instanceof AxiosError){
        console.log(error.message);
      } else {
        console.log(error);
      }
  }

  const list = JSON.parse(data);
  const [reponseData] = list.filter((item: string[]) => item[1] === RPCID)
    .map((item: string[]) => {
      const [, , responseText] = item;
      return JSON.parse(responseText);
    });

  const albumItems = reponseData[1];
  const next = reponseData[2];
  const [albumId, albumTitle, albumDates , downloadUrl, albumCover, albumOwner] = reponseData[3];
  const sharedUrl = reponseData[3][32];
  const createdAt = albumDates[4];
  const updatedAt = albumDates[8];
  const [coverUrl, coverWidth, coverHeight] = albumCover;
  const ownerId = albumOwner[1];
  const [ownerFullname,,ownerGenre, ownerName] = albumOwner[11];
  const ownerPhoto = albumOwner[3];
    
  const items = albumItems.map((item: unknown[]) => {
    const [id, itemData] = item;
    const [url] = itemData as unknown[];
    return { id, url };
  });

  return {
    id: albumId,
    key,
    token: next,
    title: albumTitle,
    url: sharedUrl,
    downloadUrl,
    createdAt,
    updatedAt,
    cover: {
      url: coverUrl,
      width: coverWidth, 
      height: coverHeight,
    },
    owner: {
      id: ownerId,
      fullname: ownerFullname,
      name: ownerName,
      genre: ownerGenre,
      photo: ownerPhoto,
    },
    items,
  }

};


export const getAlbum = async (url: string): Promise<GoogleAlbum> => {
  let data = null;
  try {
    const res = await axios.get(url);  
    data = res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_BAD_REQUEST') {
        throw new AlbumNotFoundException();
      }
    }
  }
  
  const parsedHTML = load(data);
  const canonicalUrl = parsedHTML('link[rel=\'canonical\']').attr('href') || '';
  const albumUrl = new URL(canonicalUrl);
  const [, , id] = albumUrl.pathname.split('/');
  const key = `${albumUrl.searchParams.get('key')}`;
  
  let album: GoogleAlbum | undefined;
  let token: string | undefined;
  
  do {
    const parts = await getData(id, key, token);
    if (!album) { // set once
      const {title, token, owner, cover, downloadUrl, createdAt, updatedAt} = parts;
      album = {key, id, url, title, token, owner, cover, downloadUrl, createdAt, updatedAt, items: [] }
    }
    token = parts.token;
    album.items.push(...parts.items)
  } while(token)
   
  return album;
}