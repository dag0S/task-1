import { memo, type FC } from "react";
import { Avatar, Card, Flex, Image, Typography } from "antd";

import type { IAlbum } from "../../model/types";
import { useThemeStore } from "@/features/ThemeSwitcher";

const { Title, Text } = Typography;

interface Props {
  album: IAlbum;
}

export const AlbumCard: FC<Props> = memo(({ album }) => {
  const { theme } = useThemeStore();

  return (
    <Card
      styles={{ header: { padding: 24 } }}
      title={
        <>
          <Title level={3} ellipsis title={album.title}>
            {album.title}
          </Title>
          <Flex gap={10}>
            <Avatar>{album.author?.name[0]}</Avatar>
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                {album.author?.name} ({album.author?.username})
              </Title>
              <Text type="secondary">Почта: </Text>
              <a href={`mailto:${album.author?.email}`} target="_blank">
                {album.author?.email}
              </a>
            </div>
          </Flex>
        </>
      }
      hoverable
    >
      <Image.PreviewGroup key={theme}>
        {album.photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.thumbnailUrl.replace(
              "via.placeholder.com",
              "dummyimage.com"
            )}
            width={60}
            height={60}
            // fallback="/img-placeholder.png"
            fallback="/task-1/img-placeholder.png"
            alt={photo.title}
          />
        ))}
      </Image.PreviewGroup>
    </Card>
  );
});
