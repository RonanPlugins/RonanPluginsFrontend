import App from "../App.tsx";
import Home from "./Home.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import ResourceCreate from "./resouces/ResourceCreate.tsx";
import ResourceView from "./resouces/ResourceView.tsx";
import Resources from "./resouces/Resources.tsx";
import Admin from "./Admin.tsx";
import { PERMISSION } from "@/utils/PERMISSION.ts";
import ProfileOther from "./ProfileOther.tsx";
import ResourceEdit from "./resouces/ResourceEditor.tsx";
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
      // Creator
      {
        element: <AuthGuard role={PERMISSION.CREATOR} />,
        children: [
          {
            path: "/resource/create",
            element: <ResourceCreate />,
          },
        ],
      },
      //Profile
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/resource/:id/edit",
            element: <ResourceEdit />,
          },
          // {
          //   path: "/profile/settings",
          //   element: <ProfileSettings />,
          // },
        ],
      },
      {
        element: <ProfileOther />,
        path: "/user/:userID",
      },
      //Admin
      {
        element: <AuthGuard role={PERMISSION.ADMIN} />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
