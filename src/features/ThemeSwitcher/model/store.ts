import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

interface State {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<State>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
