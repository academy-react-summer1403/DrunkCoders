import { createRoot } from "react-dom/client";
import { App } from "./app/App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
);
