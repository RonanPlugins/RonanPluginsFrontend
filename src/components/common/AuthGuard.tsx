import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loading from "./Loading";
import { PERMISSION } from "@/utils/PERMISSION";

export default function AuthGuard({ role }: { role?: any }) {
  const { isLoggedIn, userLoaded, isAdmin, isCreator } = useUserContext();

  //Loading
  if (!userLoaded) return <Loading />;
  //Not Logged in
  if (userLoaded && !isLoggedIn()) return <Navigate to="/login" replace />;
  //Permission
  if (role === PERMISSION.ADMIN && !isAdmin)
    return <Navigate to="/home" replace />;
  if (role === PERMISSION.CREATOR && !isCreator)
    return <Navigate to="/home" replace />;
  //Passed all...
  return <Outlet />;
}
