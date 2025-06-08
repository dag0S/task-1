import type { FC } from "react";
import { Table } from "antd";

import type { IPost } from "../../model/types";

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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Заголовок",
      dataIndex: "title",
    },
    {
      title: "Автор",
      dataIndex: "authorName",
    },
  ];

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
      }}
    />
  );
};
