import App from "../App.tsx";
import Home from "./Home.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import ResourceCreate from "./resouces/ResourceCreate.tsx";
import ResourceView from "./resouces/ResourceView.tsx";
import Resources from "./resouces/Resources.tsx";
import Admin from "./Admin.tsx";
// import AuthGuard from "./components/landing/AuthGuard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resource/:id",
        element: <ResourceView />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/resource/create",
            element: <ResourceCreate />,
          },
          {
            element: <AuthGuard role="admin" />,
            children: [
              {
                path: "/admin",
                element: <Admin />,
              },
              {
                path: "/resource/create",
                element: <ResourceCreate />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
