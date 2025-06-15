import { useEffect, useRef, useState, type ChangeEvent, type FC } from "react";
import { Alert, Divider, Flex, Spin, Typography } from "antd";
import { useInView } from "react-intersection-observer";

import { SearchInput } from "@/features/SearchInput";
import { useDebounce } from "@/shared/hooks";
import { AlbumList, useAlbumStore } from "@/entities/Album";

const { Title, Text } = Typography;

const LIMIT = 6;

export const AlbumsPage: FC = () => {
  const albums = useAlbumStore((state) => state.albums);
  const isLoading = useAlbumStore((state) => state.isLoading);
  const error = useAlbumStore((state) => state.error);
  const hasMore = useAlbumStore((state) => state.hasMore);
  const fetchMoreAlbums = useAlbumStore((state) => state.fetchMoreAlbums);
  const reset = useAlbumStore((state) => state.reset);

  const { ref: loaderRef, inView } = useInView();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const initialSearch = useRef(true);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const tryLoadMoreIfViewportNotFilled = () => {
      if (
        document.documentElement.scrollHeight <= window.innerHeight &&
        hasMore &&
        !isLoading
      ) {
        const nextPage = currentPage + 1;
        fetchMoreAlbums({
          page: nextPage,
          limit: LIMIT,
          searchValue: debouncedSearchValue,
        });
        setCurrentPage(nextPage);
      }
    };

    if (albums.length > 0) {
      tryLoadMoreIfViewportNotFilled();
    }
  }, [albums, hasMore, isLoading]);

  useEffect(() => {
    reset();
    setCurrentPage(1);
    fetchMoreAlbums({
      page: 1,
      limit: LIMIT,
      reset: true,
      searchValue: debouncedSearchValue,
    });
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (initialSearch.current) {
      initialSearch.current = false;
      return;
    }

    if (inView && hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      fetchMoreAlbums({
        page: nextPage,
        limit: LIMIT,
        searchValue: debouncedSearchValue,
      });
      setCurrentPage(nextPage);
    }
  }, [inView, hasMore, isLoading, currentPage]);

  return (
    <Flex vertical gap={16}>
      <Title level={2} style={{ marginBottom: 0 }}>
        Альбомы
      </Title>
      <SearchInput
        value={searchValue}
        onChange={handleSearch}
        placeholder="Поиск по названию"
      />
      <Divider style={{ margin: 0 }} />
      {error && <Alert type="error" message={error} />}
      <AlbumList albums={albums} />
      <div ref={loaderRef} style={{ textAlign: "center", padding: 24 }}>
        {isLoading && <Spin />}
        {!hasMore && <Text strong>Все альбомы загружены</Text>}
      </div>
    </Flex>
  );
};
