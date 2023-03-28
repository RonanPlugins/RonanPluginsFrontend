import { createContext } from "react";

const UserContext = createContext({
    user: null,
    setUser() { },
    pages: null,
    setPages() { },
})
export default UserContext