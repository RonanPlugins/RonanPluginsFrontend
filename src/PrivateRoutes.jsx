import { Outlet, Navigate, Route } from "react-router-dom";
import React,{ useContext, useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import api from "./api";

const PrivateRoutes = () => {
    const [auth, setAuth] = useState(false)
    const { setUser } = useContext(UserContext)
    useEffect(() => {
            api.user().then((user) => {
                setUser(user.data)
                setAuth(user.status === 200)
            })
    })
    return (
        auth ? <Outlet/> : <Navigate to={"/login?redirect="+encodeURI(window.location.pathname)} />
    )
}

export default PrivateRoutes