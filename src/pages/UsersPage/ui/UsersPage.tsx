import { useState, type ChangeEvent, type FC } from "react";
import { Alert, Divider, Flex, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";

import { fetchUsers, UserList, UserTable } from "@/entities/User";
import { useViewUsersStore, ViewSelector } from "@/features/ViewSelector";
import { SearchInput } from "@/features/SearchInput";

const { Title, Text } = Typography;

export const UsersPage: FC = () => {
  const view = useViewUsersStore((state) => state.view);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <Divider style={{ margin: 0 }} />
      <Flex gap={16} align="center" justify="flex-end">
        <Text strong>Вид отображения:</Text>
        <ViewSelector />
      </Flex>
      {error && <Alert type="error" message={error.message} />}
      {view === "cards" ? (
        <UserList filteredUsers={filteredUsers} isLoading={isLoading} />
      ) : (
        <UserTable users={filteredUsers} isLoading={isLoading} />
      )}
    </Flex>
  );
};
