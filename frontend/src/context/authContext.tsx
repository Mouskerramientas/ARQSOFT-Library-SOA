import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthT } from "../types/auth";

const AuthContext = createContext<useAuthT | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token, username, login, logout, error } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, token, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
