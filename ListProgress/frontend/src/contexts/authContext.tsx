// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { PublicUser } from "../types/User"; 

type AuthContextType = {
  user: PublicUser | null;
  login: (user: PublicUser, accessToken: string, refreshToken: string, remember: boolean) => void;
  logout: () => void;
  loading: boolean;
  apiRequest: (url: string, options?: RequestInit) => Promise<any>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera usuário e tokens do storage
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

    if (storedUser && storedAccessToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser) as PublicUser);
    }

    setLoading(false);
  }, []);

  function login(user: PublicUser, accessToken: string, refreshToken: string, remember: boolean) {
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

  async function refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken =
        localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

      if (!refreshToken) return null;

      const res = await fetch("http://localhost:3000/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      const newAccessToken = data.accessToken;

      // Atualiza o storage
      if (localStorage.getItem("refreshToken")) {
        localStorage.setItem("accessToken", newAccessToken);
      } else {
        sessionStorage.setItem("accessToken", newAccessToken);
      }

      return newAccessToken;
    } catch (err) {
      console.error("Falha ao renovar access token", err);
      return null;
    }
  }

  async function apiRequest(url: string, options: RequestInit = {}): Promise<any> {
    let accessToken =
      localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        accessToken = newToken;
        return apiRequest(url, options); 
      } else {
        logout(); 
        throw new Error("Sessão expirada. Faça login novamente.");
      }
    }

    return res.json();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, apiRequest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
