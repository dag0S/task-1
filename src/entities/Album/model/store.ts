import { create } from "zustand";

import type { IAlbum } from "./types";
import { $api } from "@/shared/api/api";

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

      const newAlbums = await $api.get<IAlbum[]>(
        `/albums?${queryParams.toString()}`
      );

      const albumsWithPhotos = await Promise.all(
        newAlbums.data.map(async (album) => {
          const photos = await $api.get(`/albums/${album.id}/photos?_limit=6`);

          return { ...album, photos: photos.data };
        })
      );

      set({
        albums: [...albums, ...albumsWithPhotos],
        hasMore: newAlbums.data.length > 0,
      });
    } catch (error) {
      console.error("Ошибка загрузки альбомов:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
