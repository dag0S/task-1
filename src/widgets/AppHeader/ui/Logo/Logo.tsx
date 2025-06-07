import type { FC } from "react";
import { href, Link } from "react-router-dom";
import { Typography } from "antd";

import { ROUTES } from "@/shared/model/routes";

const { Title } = Typography;

export const Logo: FC = () => {
  return (
    <Link to={href(ROUTES.HOME)}>
      <Title style={{ color: "white", margin: 0 }} level={3}>
        TASK-1
      </Title>
    </Link>
  );
};
