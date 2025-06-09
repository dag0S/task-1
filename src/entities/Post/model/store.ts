import { create } from "zustand";

import { $api } from "@/shared/api/api";
import type { IUser } from "@/entities/User";
import type { IPost } from "./types";

interface State {
  posts: IPost[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchPosts: (params: {
    page: number;
    limit: number;
    searchValue?: string;
  }) => Promise<void>;
}

export const usePostStore = create<State>((set) => ({
  posts: [],
  total: 0,
  isLoading: false,
  error: null,
  fetchPosts: async ({ page, limit, searchValue }) => {
    set({ isLoading: true, error: null });

    try {
      const queryParams = new URLSearchParams({
        _page: String(page),
        _limit: String(limit),
      });
      if (searchValue) queryParams.append("q", searchValue);

      const [postsRes, usersRes] = await Promise.all([
        $api.get<IPost[]>(`/posts?${queryParams.toString()}`),
        $api.get<IUser[]>("/users"),
      ]);

      const users = usersRes.data;
      const postsWithAuthors = postsRes.data.map((post) => ({
        ...post,
        authorName: users.find((u) => u.id === post.userId)?.username,
      }));

      set({
        posts: postsWithAuthors,
        total: 100,
        isLoading: false,
      });
    } catch (err) {
      set({ error: "Ошибка загрузки постов", isLoading: false });
    }
  },
}));
