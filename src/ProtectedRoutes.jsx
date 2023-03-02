import React,{ useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./api";
import UserContext from "./context/UserContext";
import Loading from "./pages/Loading";

const useAuth = () => {
    const { setUser } = useContext(UserContext)
    const [isAuth, setIsAuth] = useState(null)
    useEffect(() => {
        if (!isAuth) {
            api.user().then((user) => {
                setUser(user.data)
                setIsAuth(user.status === 200)
        
            }).catch(() => {
                setIsAuth(false)
            })
        }
    })

    return isAuth
}

export const ProtectedRoutes = () => {
    const isAuth = useAuth()
    if (!isAuth) {
        toast.error("You need to be logged in to see this.", { toastId: "Loading"})
    }
    return isAuth === null ? <></> : isAuth ? <Outlet /> : <Navigate to={"/login?redirect="+encodeURI(window.location.pathname)} />
}