import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { Alert, Flex, Typography } from "antd";

import { SearchInput } from "@/features/SearchInput";
import { PostTable, usePostStore } from "@/entities/Post";
import { useDebounce } from "@/shared/hooks";

const { Title } = Typography;

export const PostsPage: FC = () => {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const error = usePostStore((state) => state.error);
  const total = usePostStore((state) => state.total);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const pageSize = 5;

  const handlerCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchPosts({
      page: currentPage,
      limit: pageSize,
      searchValue: debouncedSearchValue,
    });
  }, [currentPage, fetchPosts, debouncedSearchValue]);

  return (
    <Flex vertical gap={16}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Посты
      </Title>
      <SearchInput
        value={searchValue}
        onChange={handleSearch}
        placeholder="Поиск по тексту"
      />
      {error && <Alert type="error" message={error} />}
      <PostTable
        currentPage={currentPage}
        isLoading={isLoading}
        posts={posts}
        total={total}
        pageSize={pageSize}
        onChange={handlerCurrentPage}
      />
    </Flex>
  );
};
