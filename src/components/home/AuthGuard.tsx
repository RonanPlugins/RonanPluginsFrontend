import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loading from "../common/Loading";

export default function AuthGuard() {
  const { isLoggedIn, user } = useUserContext();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (!user) return <Loading />;

  return <Outlet />;
}
