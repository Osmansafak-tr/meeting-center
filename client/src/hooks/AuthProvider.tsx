import { createContext, useContext, useState, ReactNode } from "react";
import { backendReqHandler } from "../services/reqHandler";
import cookieHandler from "../services/cookieHandler";

interface AuthContextType {
  isAuthenticated: boolean;
  verifyAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyAuth = async () => {
    const accessToken = cookieHandler.getAuthCookie();
    if (!accessToken) return;
    try {
      const url = `/account/auth/verify/${accessToken}`;
      const response = await backendReqHandler.get(url);
      const { isAuthenticated } = response.data;
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    const body = { email: email, password: password };
    const response = await backendReqHandler.post("/account", body);
    const { accessToken } = response.data;
    cookieHandler.setAuthCookie(accessToken);
  };

  const logout = async () => {
    if (!isAuthenticated) return;

    const accessToken = cookieHandler.getAuthCookie();
    const url = "/account/logout";
    const headers = {
      "x-api-key": `${import.meta.env.VITE_BACKEND_SHARED_SECRET_KEY}`,
      Authorization: `Bearer ${accessToken}`,
    };
    await backendReqHandler.post(url, {}, headers);
    cookieHandler.removeAuthCookie();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, verifyAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
