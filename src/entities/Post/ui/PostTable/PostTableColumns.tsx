import type { ColumnsType } from "antd/es/table";

import type { IPost } from "../../model/types";

export const columns: ColumnsType<IPost> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Заголовок",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "Автор",
    dataIndex: "authorName",
    key: "authorName",
  },
];
