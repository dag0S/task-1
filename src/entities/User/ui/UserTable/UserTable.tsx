import type { FC } from "react";
import { Table } from "antd";

import type { IUser } from "../../model/types";
import { columns } from "./UserTableColumns";

interface Props {
  users: IUser[];
  isLoading: boolean;
}

export const UserTable: FC<Props> = ({ isLoading, users }) => {
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
