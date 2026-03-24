"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState("processing");
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const token = searchParams.get("token");

    if (token) {
      processedRef.current = true;

      let usuarioData;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        usuarioData = {
          sub: payload.sub || "",
          email: payload.email || "",
          nombre: payload.nombre || "",
          roles: payload.roles || [],
        };
      } catch {
        usuarioData = null;
      }

      if (usuarioData) {
        login(token, usuarioData);
      }

      setStatus("success");

      const destination =
        usuarioData &&
        (usuarioData.roles.includes("admin") ||
          usuarioData.roles.includes("productor"))
          ? "/dashboard"
          : "/producto";

      setTimeout(() => {
        router.push(destination);
      }, 1000);
    } else {
      setStatus("error");
      setTimeout(() => {
        console.error("No se recibió el token de autenticación");
        router.push("/auth/sign-in");
      }, 2000);
    }
  }, [searchParams, router, login]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-dark">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-2 dark:shadow-card">
        {status === "processing" && (
          <>
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Procesando...
            </h2>
            <p className="mt-2 text-gray-500">Verificando tu cuenta</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 flex justify-center">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              ¡Bienvenido!
            </h2>
            <p className="mt-2 text-gray-500">Redireccionando a la tienda...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 flex justify-center">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Error
            </h2>
            <p className="mt-2 text-gray-500">
              No se pudo iniciar sesión. Intenta de nuevo.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-dark">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
