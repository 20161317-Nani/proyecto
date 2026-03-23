"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await api.auth.register({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
      });
      router.push("/auth/sign-in");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al registrar usuario",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2.5 block text-sm font-medium text-dark dark:text-white">
          Nombre completo
        </label>
        <input
          type="text"
          required
          className="w-full rounded-lg border border-green-200 bg-white p-3 outline-none focus:border-green-400 dark:bg-gray-dark"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
      </div>

      <div>
        <label className="mb-2.5 block text-sm font-medium text-dark dark:text-white">
          Correo electrónico
        </label>
        <input
          type="email"
          required
          className="w-full rounded-lg border border-green-200 bg-white p-3 outline-none focus:border-green-400 dark:bg-gray-dark"
          placeholder="Ingresa tu correo"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="mb-2.5 block text-sm font-medium text-dark dark:text-white">
          Contraseña
        </label>
        <input
          type="password"
          required
          className="w-full rounded-lg border border-green-200 bg-white p-3 outline-none focus:border-green-400 dark:bg-gray-dark"
          placeholder="Ingresa tu contraseña"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <div>
        <label className="mb-2.5 block text-sm font-medium text-dark dark:text-white">
          Confirmar contraseña
        </label>
        <input
          type="password"
          required
          className="w-full rounded-lg border border-green-200 bg-white p-3 outline-none focus:border-green-400 dark:bg-gray-dark"
          placeholder="Confirma tu contraseña"
          value={formData.confirmarPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmarPassword: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-lg bg-green-600 p-[13px] font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>
    </form>
  );
}
