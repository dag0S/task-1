import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ViewUsers = "cards" | "table";

interface State {
  view: ViewUsers;
  setView: (view: ViewUsers) => void;
}

export const useViewUsersStore = create<State>()(
  persist(
    (set) => ({
      view: "cards",
      setView: (view) => set({ view }),
    }),
    {
      name: "view-users",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
