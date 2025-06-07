import type { FC } from "react";
import { Card, List, Skeleton, Space } from "antd";

export const UserCardSkeleton: FC = () => {
  return (
    <List.Item>
      <Card
        title={
          <Space>
            <Skeleton.Avatar active />
            <Skeleton.Input active />
          </Space>
        }
      >
        <Skeleton paragraph={{rows: 5}} title={false}  active />
      </Card>
    </List.Item>
  );
};
