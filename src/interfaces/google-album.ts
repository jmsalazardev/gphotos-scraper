export interface GoogleAlbum {
  id: string;
  key: string;
  token?: string;
  title: string;
  url: string;
  downloadUrl: string;
  createdAt: number;
  updatedAt: number;
  cover: {
    url: string;
    width: number;
    height: number;
  }
  owner: {
    id: string;
    name: string;
    fullname: string;
    genre: string;
    photo: string;
  },
  items: {
    id: string;
    url: string;
  }[];
}
