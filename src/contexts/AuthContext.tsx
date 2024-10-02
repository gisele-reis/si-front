import { createContext, useCallback, useState } from "react";
import IAuthContextType from "../interfaces/IAuthContextType";

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("token");
    return !!storedUser;
  });

  const login = useCallback(
    ({ token, username }: { token: string; username: string }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setIsAuthenticated(true);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
