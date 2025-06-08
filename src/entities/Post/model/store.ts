import { create } from "zustand";

import { $api } from "@/shared/api/api";
import type { IUser } from "@/entities/User";
import type { IPost } from "./types";

interface State {
  posts: IPost[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchPosts: (page: number, limit: number) => Promise<void>;
}

export const usePostStore = create<State>((set) => ({
  posts: [],
  total: 0,
  isLoading: false,
  error: null,
  fetchPosts: async (page, limit) => {
    set({ isLoading: true, error: null });

    try {
      const [postsRes, usersRes] = await Promise.all([
        $api.get<IPost[]>(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        ),
        $api.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`),
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
