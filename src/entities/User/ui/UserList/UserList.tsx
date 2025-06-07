import type { FC } from "react";
import { Alert, List } from "antd";

import type { IUser } from "@/entities/User/model/types";
import { UserCard } from "../UserCard/UserCard";
import { UserCardSkeleton } from "../UserCard/UserCardSkeleton";

interface Props {
  filteredUsers: IUser[];
  isLoading: boolean;
  error: string | null;
}

export const UserList: FC<Props> = ({ filteredUsers, error, isLoading }) => {
  const skeletons = new Array(9).fill(0);

  return (
    <>
      {error && <Alert type="error" message={error} />}
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
    </>
  );
};
