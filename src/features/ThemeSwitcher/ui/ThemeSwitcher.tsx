import type { FC } from "react";
import { Segmented } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useThemeStore, type Theme } from "../model/store";

export const ThemeSwitcher: FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <Segmented
      value={theme}
      onChange={(val) => setTheme(val as Theme)}
      options={[
        { value: "light", icon: <SunOutlined /> },
        { value: "dark", icon: <MoonOutlined /> },
      ]}
    />
  );
};
