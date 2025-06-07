import { createRoot } from "react-dom/client";

import { Providers } from "./providers/Providers";

import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(<Providers />);
