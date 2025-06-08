import { Table } from "antd";
import type { FC } from "react";
import type { ColumnsType } from "antd/es/table";

import type { IUser } from "../../model/types";

interface Props {
  users: IUser[];
  isLoading: boolean;
}

export const UserTable: FC<Props> = ({ isLoading, users }) => {
  const columns: ColumnsType<IUser> = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Юзернейм",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Сайт",
      dataIndex: "website",
      key: "website",
      render: (text) => (
        <a href={`http://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Город",
      key: "city",
      render: (_, user) => user.address.city,
    },
    {
      title: "Компания",
      key: "company",
      render: (_, user) => user.company.name,
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: true }}
    />
  );
};
