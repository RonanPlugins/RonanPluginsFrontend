import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loading from "./Loading";

export default function AuthGuard() {
  const { isLoggedIn, userLoaded } = useUserContext();

  if (userLoaded && !isLoggedIn()) return <Navigate to="/login" replace />;

  if (!userLoaded) return <Loading />;

  return <Outlet />;
}
