import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  USERS: "/users",
  ALBUMS: "/albums",
  POSTS: "/posts",
  POST: "/posts/:postId",
} as const;

export type PathParams = {
  [ROUTES.POST]: {
    postId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
