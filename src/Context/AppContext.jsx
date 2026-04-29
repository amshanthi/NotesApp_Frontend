import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isLogIn, setIsLogIn] = useState(false);
  const value = { isLogIn, setIsLogIn };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
