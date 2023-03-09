import { Outlet, Navigate, Route } from "react-router-dom";
import React,{ useContext, useEffect, useState } from "react";
import UserContext from "../app-context-manager/UserContext";
import api from "../../api";

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

const PrivateRoutes = () => {
    const isAuth = useAuth()
    return isAuth === null ? <></> : isAuth ? <Outlet /> : <Navigate to={"/login?redirect="+encodeURI(window.location.pathname)} />
}

export default PrivateRoutes