"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  sub: string;
  email: string;
  roles: string[];
  permisos: string[];
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.push("/auth/sign-in");
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles || [],
        permisos: payload.permisos || [],
      });
    } catch {
      localStorage.removeItem("token");
      router.push("/auth/sign-in");
    }
    setLoading(false);
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.some((r) => user.roles.includes(r));
  };

  const hasPermiso = (permiso: string | string[]): boolean => {
    if (!user) return false;
    const permisos = Array.isArray(permiso) ? permiso : [permiso];
    return permisos.some((p) => user.permisos.includes(p));
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };

  return {
    user,
    loading,
    hasRole,
    hasPermiso,
    logout,
    isAuthenticated: !!user,
  };
}
