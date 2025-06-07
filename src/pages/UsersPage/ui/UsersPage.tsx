import { useEffect, useState, type ChangeEvent, type FC } from "react";

import { UserList, useUserStore } from "@/entities/User";
import { ViewSelector } from "@/features/ViewSelector";
import { SearchInput } from "@/features/SearchInput";
import { Typography } from "antd";

const { Title } = Typography;

export const UsersPage: FC = () => {
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <Title level={2}>Пользователи</Title>
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="Поиск по имени"
      />
      <ViewSelector />
      <UserList
        filteredUsers={filteredUsers}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};
