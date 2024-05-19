import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router.tsx";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
