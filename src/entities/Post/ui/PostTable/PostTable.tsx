import type { FC } from "react";
import { Table } from "antd";

import type { IPost } from "../../model/types";
import { columns } from "./PostTableColumns";
import { ROUTES } from "@/shared/model/routes";
import { href, useNavigate } from "react-router-dom";

interface Props {
  posts: IPost[];
  isLoading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export const PostTable: FC<Props> = ({
  isLoading,
  posts,
  currentPage,
  total,
  pageSize,
  onChange,
}) => {
  const navigate = useNavigate();

  return (
    <Table
      columns={columns}
      dataSource={posts}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange,
        showSizeChanger: false,
      }}
      onRow={(post) => {
        return {
          onClick: () =>
            navigate(`${href(ROUTES.POST, { postId: post.id.toString() })}`),
          style: { cursor: "pointer" },
        };
      }}
    />
  );
};
