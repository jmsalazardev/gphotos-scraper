import { Photo } from './photo';

export interface Album {
    id: string;
    title: string;
    url: string;
    createdAt: number;
    updatedAt: number;
    photos: Photo[];
    cover?: Photo;
}
