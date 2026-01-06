import { createContext, useContext, useEffect, useState } from "react";
import type { PublicUser } from "../types/User"; 

type AuthContextType = {
  user: PublicUser | null;
  login: (user: PublicUser, accessToken: string, refreshToken: string, remember: boolean) => void;
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

  const accessToken =
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (storedUser && accessToken) {
    try {
  setUser(JSON.parse(storedUser));
} catch {
  logout();
}

  }

  setLoading(false);
}, []);

  function login(user: PublicUser,  accessToken: string, refreshToken: string, remember: boolean) {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("user", JSON.stringify(user));
    storage.setItem("accessToken", accessToken);
    storage.setItem("refreshToken", refreshToken);
    localStorage.removeItem("demo_start_time");


    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

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
