import { create } from "zustand";

import type { IComment } from "@/entities/Comment";
import type { IUser } from "@/entities/User";
import type { IPost } from "@/entities/Post";
import { $api } from "@/shared/api/api";

interface PostDetailsState {
  post: IPost | null;
  author: IUser | null;
  comments: IComment[];
  isLoading: boolean;
  error: string | null;
  fetchPostDetails: (postId: string) => Promise<void>;
}

export const usePostDetailsStore = create<PostDetailsState>((set) => ({
  post: null,
  author: null,
  comments: [],
  isLoading: false,
  error: null,

  fetchPostDetails: async (postId: string) => {
    set({ isLoading: true, error: null });

    try {
      const postRes = await $api.get<IPost>(`/posts/${postId}`);
      const post = postRes.data;

      const [authorRes, commentsRes] = await Promise.all([
        $api.get<IUser>(`/users/${post.userId}`),
        $api.get<IComment[]>(`/posts/${postId}/comments`),
      ]);
      const author = authorRes.data;
      const comments = commentsRes.data;

      set({
        post,
        author,
        comments,
        isLoading: false,
      });
    } catch (err) {
      set({ error: "Ошибка загрузки данных", isLoading: false });
    }
  },
}));
