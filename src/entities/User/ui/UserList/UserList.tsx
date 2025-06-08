import type { FC } from "react";
import { List } from "antd";

import type { IUser } from "@/entities/User/model/types";
import { UserCard } from "../UserCard/UserCard";
import { UserCardSkeleton } from "../UserCard/UserCardSkeleton";

interface Props {
  filteredUsers: IUser[];
  isLoading: boolean;
}

export const UserList: FC<Props> = ({ filteredUsers, isLoading }) => {
  const skeletons = new Array(9).fill(0);

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
      dataSource={isLoading ? skeletons : filteredUsers}
      renderItem={(user, index) => (
        <List.Item key={isLoading ? index : user.id}>
          {isLoading ? <UserCardSkeleton /> : <UserCard user={user} />}
        </List.Item>
      )}
    />
  );
};
