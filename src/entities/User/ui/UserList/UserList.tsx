import type { FC } from "react";
import { List } from "antd";

import type { IUser } from "@/entities/User/model/types";
import { UserCard } from "../UserCard/UserCard";

interface Props {
  filteredUsers: IUser[];
}

export const UserList: FC<Props> = ({ filteredUsers }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      dataSource={filteredUsers}
      renderItem={(user) => <UserCard user={user} />}
    />
  );
};
