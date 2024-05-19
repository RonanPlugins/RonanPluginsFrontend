import App from "../App.tsx";

import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Home from "./Home.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Plugins from "./Plugins.tsx";
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
        path: "/home",
        element: <Home />,
      },
      {
        path: "/plugins",
        element: <Plugins />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      // {
      //   element: <AuthGuard />,
      //   children: [
      //     // {
      //     //   path: "/profile",
      //     //   element: <Profile />,
      //     // },
      //   ],
      // },
    ],
  },
]);
