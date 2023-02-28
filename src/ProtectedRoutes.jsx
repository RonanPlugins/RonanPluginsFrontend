import React,{ useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "./api";
import UserContext from "./context/UserContext";

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
    
    return isAuth === null ? <p>Loading...</p> : isAuth ? <Outlet /> : <Navigate to={"/auth/login?redirect="+encodeURI(window.location.pathname)} />
}