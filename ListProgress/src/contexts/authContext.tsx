import { createContext, useContext, useEffect, useState } from "react";
import type { PublicUser } from "../types/User"; 

type AuthContextType = {
  user: PublicUser | null;
  login: (user: PublicUser, token: string, remember: boolean) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser) as PublicUser);
    }

    setLoading(false);
  }, []);

  function login(user: PublicUser, token: string, remember: boolean) {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("user", JSON.stringify(user));
    storage.setItem("token", token);

    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
