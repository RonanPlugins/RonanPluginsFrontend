import App from "../App.tsx";
import About from "./About.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Profile from "./profile/Profile.tsx";
import { RoleGuard } from "@/components/common/RoleGuard.tsx";
import { ResourceCreate } from "./resources/Create.tsx";
import { ResourceView } from "./resources/View.tsx";
import Admin from "./Admin.tsx";
import ProfileOther from "./profile/ProfileOther.tsx";
import { ResourceEdit } from "./resources/Editor.tsx";
import StripeRefresh from "./stripe/StripeRefresh.tsx";
import { Servers } from "./servers/index.tsx";
import { PERMISSION } from "minecentral-api";
import { Resources } from "./resources/index.tsx";
import { FilterResource } from "@/context/FilterResourceContext.tsx";
import Login from "@/components/main/Login.tsx";
import Signup from "@/components/main/Signup.tsx";
import EmailValidated from "@/components/main/EmailValidated.tsx";
import LoginGuard from "@/components/common/LoginGuard.tsx";

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
      {
        element: <LoginGuard />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
        ],
      },

      {
        path: "/email-validated/:id",
        element: <EmailValidated />,
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
      //Login Protected
      {
        element: <RoleGuard />,
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
        ],
      },
      {
        element: <ProfileOther />,
        path: "/user/:userID",
      },
      //Admin
      {
        element: <RoleGuard role={PERMISSION.ADMIN} />,
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
