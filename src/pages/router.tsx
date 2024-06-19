import App from "../App.tsx";
import About from "./About.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import { ResourceCreate } from "./resources/Create.tsx";
import { ResourceView } from "./resources/View.tsx";
import { Resources } from "./resources/index.tsx";
import Admin from "./Admin.tsx";
import { PERMISSION } from "@/utils/PERMISSION.ts";
import ProfileOther from "./ProfileOther.tsx";
import { ResourceEdit } from "./resources/Editor.tsx";
import StripeRefresh from "./stripe/StripeRefresh.tsx";
import { Servers } from "./servers/index.tsx";

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
