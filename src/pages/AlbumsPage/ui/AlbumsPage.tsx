import { useEffect, useRef, useState, type ChangeEvent, type FC } from "react";
import { Alert, Card, Col, Flex, Image, Row, Spin, Typography } from "antd";

import { SearchInput } from "@/features/SearchInput";
import { useAlbumStore } from "@/entities/Album/model/store";
import { useDebounce } from "@/shared/hooks";

const { Title } = Typography;

export const AlbumsPage: FC = () => {
  const albums = useAlbumStore((state) => state.albums);
  const isLoading = useAlbumStore((state) => state.isLoading);
  const error = useAlbumStore((state) => state.error);
  const hasMore = useAlbumStore((state) => state.hasMore);
  const fetchMoreAlbums = useAlbumStore((state) => state.fetchMoreAlbums);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchMoreAlbums({
      limit: 5,
      page: currentPage,
      searchValue: debouncedSearchValue,
    });
  }, [fetchMoreAlbums, AlbumsPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMoreAlbums({
            limit: 5,
            page: currentPage,
            searchValue: debouncedSearchValue,
          });
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [loaderRef.current, hasMore, isLoading]);

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
      <Row gutter={[16, 16]}>
        {albums.map((album) => (
          <Col key={album.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={album.title} hoverable>
              <Image.PreviewGroup>
                {album.photos.map((photo) => (
                  <Image
                    key={photo.id}
                    src={photo.thumbnailUrl.replace(
                      "via.placeholder.com",
                      "dummyimage.com"
                    )}
                    width={60}
                    height={60}
                    alt={photo.title}
                    style={{
                      marginRight: 8,
                      marginBottom: 8,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Image.PreviewGroup>
            </Card>
          </Col>
        ))}
      </Row>
      <div ref={loaderRef} style={{ textAlign: "center", padding: 24 }}>
        {isLoading && <Spin />}
        {!hasMore && <p>Все альбомы загружены</p>}
      </div>
    </Flex>
  );
};
