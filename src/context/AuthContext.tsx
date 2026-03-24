"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { getCookie, setCookie, removeCookie } from "@/lib/cookies";

interface Usuario {
  sub: string;
  email: string;
  nombre: string;
  roles: string[];
  permisos?: string[];
}

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isProductor: boolean;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(() => {
    const token = getCookie("token");
    const usuarioStr = getCookie("usuario");

    if (token && usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        setUser(usuario);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const login = useCallback((token: string, usuario: Usuario) => {
    setCookie("token", token, 7);
    setCookie("usuario", JSON.stringify(usuario), 7);
    setUser(usuario);
  }, []);

  const logout = useCallback(() => {
    removeCookie("token");
    removeCookie("usuario");
    setUser(null);
    window.location.href = "/auth/sign-in";
  }, []);

  const isAdmin = useMemo(
    () => user?.roles?.includes("admin") ?? false,
    [user],
  );

  const isProductor = useMemo(
    () => user?.roles?.includes("productor") ?? false,
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      isAdmin,
      isProductor,
      login,
      logout,
      refreshAuth,
    }),
    [user, loading, isAdmin, isProductor, login, logout, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
