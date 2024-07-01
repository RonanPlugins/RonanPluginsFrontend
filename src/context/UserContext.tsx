import api from "@/api";
import { PERMISSION } from "minecentral-api";
import { createContext, useContext, useEffect, useState } from "react";

const initialState: InitialStateUser = {
  user: null,
  isLoggedIn: false,
  logout: () => {},
  userLoaded: false,
  isAdmin: false,
  isDeveloper: false,
  isPremiumReady: false,
  refresh: () => {},
};

interface InitialStateUser {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
  userLoaded: boolean;
  isAdmin: boolean;
  isDeveloper: boolean;
  isPremiumReady: boolean;
  refresh: () => void;
}

interface User {
  _id: string;
  email: string;
  name: string;
  avatarURL: string;
  lastLogin: string;
  role: number;
  stripe: StripeUser;
}

interface StripeUser {
  account_id: string;
  verified: boolean;
}

const UserContext = createContext<InitialStateUser>(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isDeveloper, setDeveloper] = useState(false);
  const [isPremiumReady, setPremiumReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refresh = async () => {
    await getUser();
    console.log("Reloading user data");
  };

  const getUser = async () => {
    const data = await api.autoLogin();
    if (data) {
      setUser(data);
      setAdmin(data.role === PERMISSION.ADMIN);
      setDeveloper(data.role >= PERMISSION.DEVELOPER);
      // const stripe = await profile.getStripeStatus();
      setPremiumReady(data.stripe?.verified);
      setIsLoggedIn(true);
    }
    setUserLoaded(true);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log("Welcome to RonanServices! Want to contribute?");
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        userLoaded,
        isAdmin,
        isDeveloper,
        isPremiumReady,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
