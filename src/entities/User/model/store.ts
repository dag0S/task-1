import { create } from "zustand";

import { $api } from "@/shared/api/api";
import type { IUser } from "./types";

interface State {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<State>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await $api.get<IUser[]>("/users");
      set({ users: res.data, isLoading: false });
    } catch (error) {
      set({ error: "Ошибка загрузки пользователей", isLoading: false });
    }
  },
}));
