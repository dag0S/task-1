import type { FC } from "react";

import { AppRouter } from "../../AppRouter";
import { ThemeProvider } from "../../ThemeProvider";

export const Providers: FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};
