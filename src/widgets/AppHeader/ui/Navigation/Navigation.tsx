import type { FC } from "react";
import { href, Link, useLocation } from "react-router-dom";
import { Menu, type MenuProps } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { ROUTES } from "@/shared/model/routes";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    label: <Link to={href(ROUTES.HOME)}>Главная</Link>,
    key: ROUTES.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={href(ROUTES.POSTS)}>Посты</Link>,
    key: ROUTES.POSTS,
    icon: <ReadOutlined />,
  },
  {
    label: <Link to={href(ROUTES.USERS)}>Пользователи</Link>,
    key: ROUTES.USERS,
    icon: <UserOutlined />,
  },
  {
    label: <Link to={href(ROUTES.ALBUMS)}>Альбомы</Link>,
    key: ROUTES.ALBUMS,
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
      items={menuItems}
    />
  );
};
