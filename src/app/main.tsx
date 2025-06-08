import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";

import { Providers } from "./providers/Providers";

import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(<Providers />);
