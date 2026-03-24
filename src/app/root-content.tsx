"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { TiendaHeader } from "@/components/Tienda/tienda-header";

export function RootContent({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        setUserRole(usuario.roles || []);
      } catch {
        setUserRole([]);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
        <TiendaHeader />
        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    );
  }

  const isLoggedIn = userRole.length > 0;
  const isAdminOrProductor =
    userRole.includes("admin") || userRole.includes("productor");

  const isAuthRoute = pathname.startsWith("/auth/");

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    );
  }

  const isTiendaRoute = pathname === "/" || pathname === "/producto";

  if (isTiendaRoute) {
    if (isLoggedIn && !isAdminOrProductor) {
      return (
        <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
          <Header />
          <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
        <TiendaHeader />
        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    );
  }

  if (isLoggedIn) {
    if (isAdminOrProductor) {
      return (
        <SidebarProvider>
          <div className="flex min-h-screen bg-gray-2 dark:bg-[#020d1a]">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      );
    }

    return (
      <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
      <TiendaHeader />
      <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
        {children}
      </main>
    </div>
  );
}
