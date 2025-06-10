import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { Alert, Flex, Spin, Typography } from "antd";
import { useInView } from "react-intersection-observer";

import { SearchInput } from "@/features/SearchInput";
import { useDebounce } from "@/shared/hooks";
import { AlbumList, useAlbumStore } from "@/entities/Album";

const { Title, Text } = Typography;

export const AlbumsPage: FC = () => {
  const albums = useAlbumStore((state) => state.albums);
  const isLoading = useAlbumStore((state) => state.isLoading);
  const error = useAlbumStore((state) => state.error);
  const hasMore = useAlbumStore((state) => state.hasMore);
  const fetchMoreAlbums = useAlbumStore((state) => state.fetchMoreAlbums);

  const { ref: loaderRef, inView } = useInView();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading && !error) {
      fetchMoreAlbums({
        limit: 5,
        page: currentPage,
        searchValue: debouncedSearchValue,
      });
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isLoading, debouncedSearchValue, error]);

  return (
    <Flex vertical gap={16}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Альбомы
      </Title>
      <SearchInput
        value={searchValue}
        onChange={handleSearch}
        placeholder="Поиск по тексту"
      />
      {error && <Alert type="error" message={error} />}
      <AlbumList albums={albums} />
      <div ref={loaderRef} style={{ textAlign: "center", padding: 24 }}>
        {isLoading && <Spin />}
        {!hasMore && <Text strong>Все альбомы загружены</Text>}
      </div>
    </Flex>
  );
};
