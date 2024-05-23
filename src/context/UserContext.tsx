import { createContext, useContext, useEffect, useState } from "react";

const initialState = { user: null, isLoggedIn: () => false, logout: () => {} };

const UserContext = createContext(initialState);

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState(null);

  const isLoggedIn = () => {
    return user !== null;
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log("Welcome to RonanServices! Want to contribute?");
    const getUser = () => {
      fetch(`${import.meta.env.VITE_API_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication failed!");
        })
        .then((response) => {
          setUser(response.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
}
