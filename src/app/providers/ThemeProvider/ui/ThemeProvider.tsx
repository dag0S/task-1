import type { FC, ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

import { useThemeStore } from "@/features/ThemeSwitcher";

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#ff5400",
          colorInfo: "#ff5400",
          colorBgContainer: theme === "dark" ? "#1f1f1f" : "#fff8f5",
          borderRadius: 12,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
