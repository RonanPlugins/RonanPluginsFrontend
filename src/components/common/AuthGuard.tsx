import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loading from "./Loading";
import { PERMISSION } from "@/utils/PERMISSION";

export default function AuthGuard({ role }: { role?: any }) {
  const { isLoggedIn, userLoaded, isAdmin, isDeveloper } = useUserContext();

  //Loading
  if (!userLoaded) return <Loading />;
  //Not Logged in
  if (userLoaded && !isLoggedIn()) return <Navigate to="/login" replace />;
  //Permission
  if (role === PERMISSION.ADMIN && !isAdmin)
    return <Navigate to="/home" replace />;
  if (role === PERMISSION.CREATOR && !isDeveloper)
    return <Navigate to="/home" replace />;
  //Passed all...
  return <Outlet />;
}
