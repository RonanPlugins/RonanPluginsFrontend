import { useNavigate } from 'react-router-dom'
import React ,{ useContext } from 'react'
import { toast } from 'react-toastify'
import api from '../api'
import UserContext from '../context/UserContext'

const LogOut = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    api.logout().then((logout) => {
        if (logout.status === 200) {
            toast.success("You have been logged out.",{toastId: "loggedout"})
            navigate("/auth/login")
            setUser(null)
            return
        }
    })
    .catch(() => {
        toast.error("An error occurred.",{toastId: "errorocc"})
        navigate("/auth/login")
        return
    })

    return (
        <p>
        You are being logged out!
        </p>
    )
}

export default LogOut