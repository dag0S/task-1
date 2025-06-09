import type { ColumnsType } from "antd/es/table";

import type { IPost } from "../../model/types";

export const columns: ColumnsType<IPost> = [
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
    title: "Текст",
    dataIndex: "body",
    ellipsis: true,
  },
  {
    title: "Автор",
    dataIndex: "authorName",
    width: 200,
  },
];
