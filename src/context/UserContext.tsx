import api from "@/api";
import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  user: null,
  isLoggedIn: () => false,
  logout: () => {},
  userLoaded: false,
};

const UserContext = createContext(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const isLoggedIn = () => {
    return user !== null;
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log("Welcome to RonanServices! Want to contribute?");
    const getUser = async () => {
      const data = await api.autoLogin();
      if (data) setUser(data);
      setUserLoaded(true);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, logout, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
}
