import App from "../App.tsx";
import About from "./About.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./profile/Profile.tsx";
import AuthGuard from "@/components/common/AuthGuard.tsx";
import { ResourceCreate } from "./resources/Create.tsx";
import { ResourceView } from "./resources/View.tsx";
import Admin from "./Admin.tsx";
import ProfileOther from "./profile/ProfileOther.tsx";
import { ResourceEdit } from "./resources/Editor.tsx";
import StripeRefresh from "./stripe/StripeRefresh.tsx";
import { Servers } from "./servers/index.tsx";
import { ImportSpigot } from "./profile/ImportSpigot.tsx";
import { PERMISSION } from "minecentral-api";
import { Resources } from "./resources/index.tsx";
import { FilterResource } from "@/context/FilterResourceContext.tsx";

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
      //Resources
      {
        path: "/resources",
        element: (
          <FilterResource>
            <Resources />
          </FilterResource>
        ),
      },
      {
        path: "/resource/:id",
        element: <ResourceView />,
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
            path: "/resource/create",
            element: <ResourceCreate />,
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
