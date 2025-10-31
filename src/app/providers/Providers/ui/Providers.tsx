import type { FC } from "react";

import { AppRouter } from "../../AppRouter";
import { ThemeProvider } from "../../ThemeProvider";
import { TanStackQueryProvider } from "../../TanStackQueryProvider";

export const Providers: FC = () => {
  return (
    <TanStackQueryProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </TanStackQueryProvider>
  );
};
