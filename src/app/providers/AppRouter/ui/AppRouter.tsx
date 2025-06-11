import type { FC } from "react";
import { MemoryRouter, RouterProvider } from "react-router-dom";

import { router } from "../config/router";

export const AppRouter: FC = () => {
  return (
    <MemoryRouter basename={import.meta.env.VITE_BASE_URL}>
      <RouterProvider router={router} />
    </MemoryRouter>
  );
};
