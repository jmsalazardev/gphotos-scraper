import { load } from 'cheerio';
import JSON5 from 'json5';
import axios, { AxiosError } from 'axios';
import { GoogleAlbum } from '../interfaces';
import { AlbumNotFoundException } from '../exceptions';

export const getAlbum  = async (url: string): Promise<GoogleAlbum> => {
  const parsedUrl = new URL(url);
  const [, id] = parsedUrl.pathname.split('/');

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
  const key = albumUrl.searchParams.get('key');
  const title = parsedHTML('title').text().replace(' - Google Photos', '');

  const scripts = parsedHTML('script').get().map((item) => {
    const { data } = item.children[0] as { data: string };
    return data;
  });

  const result = {
    id,
    key,
    title,
    items: [],
    url,
  } as GoogleAlbum;

  const filtered = scripts.filter(
    (item) => item.startsWith('AF_initDataCallback')
  );

  filtered.forEach((item) => {
    item.replace('AF_initDataCallback(', '').replace(/$/, '');
    const txt = item.substring(20, item.length - 2);
    const obj = JSON5.parse(txt);
    if (obj.data &&
      Array.isArray(obj.data[1]) &&
      Array.isArray(obj.data[1][0])) {
      const rows = obj.data[1];
      const info = rows.map((item) => {
        const [id, itemData] = item;
        const [url] = itemData;
        return { id, url };
      });
      result.items.push(...info);
    }
  });

  return result;
}