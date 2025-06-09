import type { FC } from "react";
import { Table, Typography } from "antd";
import { href, useNavigate } from "react-router-dom";

import type { IPost } from "../../model/types";
import { columns } from "./PostTableColumns";
import { ROUTES } from "@/shared/model/routes";

const { Text } = Typography;

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
      dataSource={posts}
      columns={columns}
      loading={isLoading}
      rowKey="id"
      scroll={{ x: true }}
      expandable={{
        expandedRowRender: (post) => (
          <div>
            <Text strong>Содержание: </Text>
            <Text>{post.body}</Text>
          </div>
        ),
        rowExpandable: (post) => post.body !== "Не расширяемый",
      }}
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
