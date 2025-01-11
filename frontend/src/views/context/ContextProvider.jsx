import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();

export function ContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const isTokenValid = (token) => {
    try {
      let decoded = jwtDecode(token);
      let now = Date.now() / 1000; // Current date in seconds
      return decoded.exp > now; // Check expiration
    } catch (error) {
      return false;
    }
  };

  const HandleAuthenticate = () => {
    const token = sessionStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  return (
    <AppContext.Provider value={{ isLogged, HandleAuthenticate }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
