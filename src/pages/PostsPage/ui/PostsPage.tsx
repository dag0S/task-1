import { useEffect, useState, type FC } from "react";
import { Alert, Flex, Typography } from "antd";

import { SearchInput } from "@/features/SearchInput";
import { PostTable, usePostStore } from "@/entities/Post";

const { Title } = Typography;

export const PostsPage: FC = () => {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const error = usePostStore((state) => state.error);
  const total = usePostStore((state) => state.total);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlerCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchPosts(currentPage, pageSize);
  }, [currentPage, fetchPosts]);

  return (
    <Flex vertical gap={16}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Посты
      </Title>
      {/* <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="Поиск по тексту"
      /> */}
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
