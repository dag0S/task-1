import type { FC } from "react";
import { Card, Flex, List, Skeleton } from "antd";

export const PostDetailsSkeleton: FC = () => {
  const comments = new Array(5).fill(0);

  return (
    <Flex vertical gap={16} style={{ maxWidth: 600, margin: "0 auto" }}>
      <Skeleton.Input active size="small" style={{ width: 200 }} />
      <Card>
        {
          <Flex gap={16}>
            <Skeleton.Avatar active />
            <div>
              <Skeleton.Input active style={{ marginBottom: 16 }} />
              <br />
              <Skeleton.Input active size="small" />
            </div>
          </Flex>
        }
      </Card>
      <Card title={<Skeleton.Input active />}>
        {<Skeleton active paragraph={{ rows: 4 }} title={false} />}
      </Card>
      <Card title="Комментарии">
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={() => (
            <List.Item>
              <List.Item.Meta
                avatar={<Skeleton.Avatar active />}
                title={<Skeleton.Input active size="small" />}
                description={<Skeleton active title={false} />}
              />
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  );
};
