import { create } from "zustand";

import type { IAlbum } from "./types";
import { $api } from "@/shared/api/api";
import type { IUser } from "@/entities/User";

interface State {
  albums: IAlbum[];
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchMoreAlbums: (params: {
    page: number;
    limit: number;
    searchValue?: string;
  }) => Promise<void>;
}

export const useAlbumStore = create<State>((set, get) => ({
  albums: [],
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,

  fetchMoreAlbums: async ({ page, limit, searchValue }) => {
    const { albums, hasMore, isLoading } = get();

    if (isLoading || !hasMore) return;

    set({ isLoading: true, error: null });

    try {
      const queryParams = new URLSearchParams({
        _page: String(page),
        _limit: String(limit),
      });

      if (searchValue) queryParams.append("q", searchValue);

      const [newAlbumsRes, usersRes] = await Promise.all([
        $api.get<IAlbum[]>(`/albums?${queryParams.toString()}`),
        $api.get<IUser[]>("/users"),
      ]);

      const users = usersRes.data;
      const newAlbumsWithAuthors = newAlbumsRes.data.map((album) => ({
        ...album,
        author: users.find((u) => u.id === album.userId),
      }));

      const albumsWithPhotos = await Promise.all(
        newAlbumsWithAuthors.map(async (album) => {
          const photosRes = await $api.get(
            `/albums/${album.id}/photos?_limit=6`
          );
          const photos = photosRes.data;

          return { ...album, photos };
        })
      );

      set({
        albums: [...albums, ...albumsWithPhotos],
        hasMore: newAlbumsWithAuthors.length > 0,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: "Ошибка загрузки альбомов",
        isLoading: false,
      });
    }
  },
}));
