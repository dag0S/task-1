import type { FC } from "react";
import { Radio } from "antd";
import { AppstoreOutlined, TableOutlined } from "@ant-design/icons";

import { useViewUsersStore } from "../model/store";

export const ViewSelector: FC = () => {
  const view = useViewUsersStore((state) => state.view);
  const setView = useViewUsersStore((state) => state.setView);

  return (
    <Radio.Group
      value={view}
      onChange={(e) => setView(e.target.value)}
      style={{ marginBottom: "16px" }}
    >
      <Radio.Button value="cards" title="Карточки">
        <AppstoreOutlined />
      </Radio.Button>
      <Radio.Button value="table" title="Таблица">
        <TableOutlined />
      </Radio.Button>
    </Radio.Group>
  );
};
