import type { PathParams, ROUTES } from "@/shared/model/routes";
import type { FC } from "react";
import { useParams } from "react-router-dom";

export const PostPage: FC = () => {
  const params = useParams<PathParams[typeof ROUTES.POST]>();

  return <div>PostPage {params.postId}</div>;
};
