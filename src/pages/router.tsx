import App from "../App.tsx";
import Home from "./Home.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import PostCreate from "./resouces/ResourceCreate.tsx";
import ResourceView from "./resouces/ResourceView.tsx";
import Resources from "./resouces/Resources.tsx";
// import AuthGuard from "./components/landing/AuthGuard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resources/:id",
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
            path: "/post/create",
            element: <PostCreate />,
          },
        ],
      },
    ],
  },
]);
