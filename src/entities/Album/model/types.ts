import type { IUser } from "@/entities/User";

interface IPhoto {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export interface IAlbum {
  id: number;
  title: string;
  photos: IPhoto[];
  author: IUser;
}
