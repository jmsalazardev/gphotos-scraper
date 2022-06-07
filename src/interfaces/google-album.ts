export interface GoogleAlbum {
  id: string;
  key: string;
  title: string;
  url: string;
  items: {
    id: string;
    url: string;
  }[];
}
