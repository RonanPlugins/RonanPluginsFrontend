import { createContext } from "react";

const UserContext = createContext({
    user: null,
    setUser() { },
    pages: [],
    setPages() { },
})
export default UserContext