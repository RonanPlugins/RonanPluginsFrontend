import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath =
      process.env.NODE_ENV !== "PROD" ? "/dev-dist/sw.js" : "/sw.js";
    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
