import App from "../App.tsx";
import About from "./About.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./profile/Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import { ResourceCreate } from "./resources/Create.tsx";
import { ResourceView } from "./resources/View.tsx";
import { Resources } from "./resources/index.tsx";
import Admin from "./Admin.tsx";
import ProfileOther from "./profile/ProfileOther.tsx";
import { ResourceEdit } from "./resources/Editor.tsx";
import StripeRefresh from "./stripe/StripeRefresh.tsx";
import { Servers } from "./servers/index.tsx";
import { ImportSpigot } from "./profile/ImportSpigot.tsx";
import { PERMISSION } from "minecentral-api";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/about" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/about" replace />,
      },
      {
        path: "/about",
        element: <About />,
      },
      //Resources
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resource/:id",
        element: <ResourceView />,
      },
      //Servers
      {
        path: "/servers",
        element: <Servers />,
      },
      //Stripe
      {
        path: "/refresh/:accountId",
        element: <StripeRefresh />,
      },
      // Creator
      {
        element: <AuthGuard role={PERMISSION.DEVELOPER} />,
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
          {
            path: "/profile/import/spigot",
            element: <ImportSpigot />,
          },
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
