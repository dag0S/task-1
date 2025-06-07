import { Drawer } from "antd";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  placement?: "right" | "left" | "bottom" | "top";
  onClose: () => void;
  open: boolean;
}

export const AppDrawer: FC<Props> = ({
  children,
  title,
  placement = "right",
  onClose,
  open,
}) => {
  return (
    <Drawer title={title} placement={placement} onClose={onClose} open={open}>
      {children}
    </Drawer>
  );
};
