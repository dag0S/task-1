import { ROUTES } from "@/shared/model/routes";
import { Button, Flex, Typography } from "antd";
import type { FC } from "react";
import { href, Link } from "react-router-dom";

const { Title } = Typography;

export const NotFoundPage: FC = () => {
  return (
    <Flex vertical align="center" gap={16} style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "100px", margin: 0 }}>404</Title>
      <Title level={2} style={{ margin: 0 }}>
        К сожалению, такой страницы нет!
      </Title>
      <Button type="primary" size="large">
        <Link to={href(ROUTES.HOME)}>На Главную</Link>
      </Button>
    </Flex>
  );
};
