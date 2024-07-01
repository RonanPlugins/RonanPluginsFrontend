import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loading from "./Loading";

export default function LoginGuard() {
  const { isLoggedIn, userLoaded } = useUserContext();

  //Loading
  if (!userLoaded) return <Loading />;
  //Not Logged in
  if (isLoggedIn) return <Navigate to="/profile" replace />;
  //Passed all...
  return <Outlet />;
}
