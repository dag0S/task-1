import type { FC } from "react";
import { Radio } from "antd";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";

export const ViewSelector: FC = () => {
  return (
    <Radio.Group defaultValue="cards" style={{ marginBottom: "16px" }}>
      <Radio.Button value="cards" title="Карточки">
        <AppstoreOutlined />
      </Radio.Button>
      <Radio.Button value="table" title="Таблица">
        <TableOutlined />
      </Radio.Button>
    </Radio.Group>
  );
};
