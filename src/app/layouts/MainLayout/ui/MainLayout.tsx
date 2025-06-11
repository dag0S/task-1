import { Outlet } from "react-router-dom";
import { Grid, Layout } from "antd";

import { AppHeader } from "@/widgets/AppHeader";

const { useBreakpoint } = Grid;
const { Content } = Layout;

export const MainLayout = () => {
  const screen = useBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content style={{ padding: screen.lg ? "20px 50px" : "16px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
