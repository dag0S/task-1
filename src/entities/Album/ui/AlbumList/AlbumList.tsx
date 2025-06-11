import type { FC } from "react";
import { Col, Row } from "antd";

import type { IAlbum } from "../../model/types";
import { AlbumCard } from "../AlbumCard/AlbumCard";

interface Props {
  albums: IAlbum[];
}

export const AlbumList: FC<Props> = ({ albums }) => {
  return (
    <Row gutter={[16, 16]}>
      {albums.map((album) => (
        <Col key={album.id} xs={24} sm={24} md={12} lg={8}>
          <AlbumCard album={album} />
        </Col>
      ))}
    </Row>
  );
};
