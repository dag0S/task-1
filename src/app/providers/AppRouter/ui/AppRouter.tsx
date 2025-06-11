import type { FC } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "../config/router";

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
