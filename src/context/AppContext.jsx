import { useEffect, useState } from "react";
import { AppContext } from "./appContext";
import { AUTH_CLEARED_EVENT, getStoredUser } from "../util/authStorage";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    const handleAuthCleared = () => {
      setUser(null);
    };

    window.addEventListener(AUTH_CLEARED_EVENT, handleAuthCleared);

    return () => {
      window.removeEventListener(AUTH_CLEARED_EVENT, handleAuthCleared);
    };
  }, []);

  const contextValue = {
    user,
    setUser,
    clearUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
