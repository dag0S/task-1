import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { Alert, Flex, Typography } from "antd";

import { UserList, UserTable, useUserStore } from "@/entities/User";
import { useViewUsersStore, ViewSelector } from "@/features/ViewSelector";
import { SearchInput } from "@/features/SearchInput";

const { Title } = Typography;

export const UsersPage: FC = () => {
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const view = useViewUsersStore((state) => state.view);

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
    <Flex vertical gap={16}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Пользователи
      </Title>
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="Поиск по имени"
      />
      <ViewSelector />
      {error && <Alert type="error" message={error} />}
      {view === "cards" ? (
        <UserList filteredUsers={filteredUsers} isLoading={isLoading} />
      ) : (
        <UserTable users={filteredUsers} isLoading={isLoading} />
      )}
    </Flex>
  );
};
