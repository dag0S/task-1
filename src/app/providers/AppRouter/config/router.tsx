import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/app/layouts/MainLayout";
import { ROUTES } from "@/shared/model/routes";

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: ROUTES.HOME,
          lazy: () => import("@/pages/HomePage"),
        },
        {
          path: ROUTES.USERS,
          lazy: () => import("@/pages/UsersPage"),
        },
        {
          path: ROUTES.POSTS,
          lazy: () => import("@/pages/PostsPage"),
        },
        {
          path: ROUTES.POST,
          lazy: () => import("@/pages/PostPage"),
        },
        {
          path: ROUTES.ALBUMS,
          lazy: () => import("@/pages/AlbumsPage"),
        },
        {
          path: ROUTES.NOT_FOUND,
          lazy: () => import("@/pages/NotFoundPage"),
        },
      ],
    },
  ],
  { basename: "/task-1/" }
);
