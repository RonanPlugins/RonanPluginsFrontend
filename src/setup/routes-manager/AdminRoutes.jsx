import { Outlet, Navigate, Route } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../app-context-manager/UserContext";
import api from "../../api";
import { toast } from "react-toastify";
import Loading from "../../util/Loading";

const useAuth = ({ neededPermissions }, setLoading) => {
  const { user } = useContext(UserContext);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    async function fetchAdminPermissions() {
      if (!user) return;

      try {
        const response = await api.getAdminPermissions({ admin_id: user.user_id });
        setIsAllowed(response.data.permissions.includes(Number(neededPermissions)));
      } catch (error) {
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminPermissions();
  }, [user, neededPermissions, setLoading]);

  return isAllowed;
};

const AdminRoutes = ({ neededPermissions }) => {
  const [loading, setLoading] = useState(true);
  const isAllowed = useAuth({ neededPermissions }, setLoading);

  if (loading) {
    return <Loading />;
  }

  if (isAllowed) {
    return <Outlet />;
  }

  toast.error("You do not have permission.", { toastId: "noperms" });
  return <Navigate to={"/login"} />;
};

export default AdminRoutes;
