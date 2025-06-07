import type { FC } from "react";
import { href, Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { ROUTES } from "@/shared/model/routes";

const { Item } = Menu;

const menuItems = [
  {
    label: "Главная",
    link: ROUTES.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: "Посты",
    link: ROUTES.POSTS,
    icon: <ReadOutlined />,
  },
  {
    label: "Пользователи",
    link: ROUTES.USERS,
    icon: <UserOutlined />,
  },
  {
    label: "Альбомы",
    link: ROUTES.ALBUMS,
    icon: <PictureOutlined />,
  },
];

interface Props {
  mode?: "horizontal" | "vertical";
  theme?: "dark" | "light";
  onClick?: () => void;
}

export const Navigation: FC<Props> = ({
  mode = "horizontal",
  theme = "light",
  onClick,
}) => {
  const location = useLocation();

  return (
    <Menu
      mode={mode}
      theme={theme}
      selectedKeys={[location.pathname]}
      onClick={onClick}
    >
      {menuItems.map((item) => (
        <Item key={item.link}>
          <Link to={href(item.link)}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </Item>
      ))}
    </Menu>
  );
};
