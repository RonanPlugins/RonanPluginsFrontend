import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import api from '../api'
import UserContext from '../setup/app-context-manager/UserContext.jsx'

const LogOut = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    api.logout().then((logout) => {
        if (logout.status === 200) {
            toast.success("You have been logged out.",{toastId: "logged_out"})
            navigate("/login")
            setUser(null)
            return
        }
    })
    .catch(() => {
        toast.error("An error occurred.",{toastId: "error_occurred"})
        navigate("/login")
        return
    })
}

export default LogOut