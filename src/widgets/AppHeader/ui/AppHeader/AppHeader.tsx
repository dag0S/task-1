import { useState, type FC } from "react";
import { Button, Flex, Grid, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { AppDrawer } from "@/shared/ui";
import { Navigation } from "../Navigation/Navigation";
import { Logo } from "../Logo/Logo";

const { Header } = Layout;
const { useBreakpoint } = Grid;

export const AppHeader: FC = () => {
  const [open, setOpen] = useState(false);
  const screen = useBreakpoint();

  const handleClose = () => setOpen(false);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        padding: screen.lg ? "20px 50px" : "0 16px",
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <Logo />
        {screen.md && <Navigation theme="dark" />}
        {!screen.md && (
          <>
            <Button type="primary" onClick={() => setOpen(true)}>
              <MenuOutlined />
            </Button>
            <AppDrawer title="Меню" onClose={handleClose} open={open}>
              <Navigation mode="vertical" onClick={handleClose} />
            </AppDrawer>
          </>
        )}
      </Flex>
    </Header>
  );
};
