const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const headers = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
};

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { email: string; password: string; nombre: string }) =>
      fetchApi(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
      }),
    googleLogin: () => {
      window.location.href = `${API_BASE}/auth/google`;
    },
    getProfile: (token: string) =>
      fetchApi(`${API_BASE}/auth/profile`, {
        headers: headers(token),
      }),
    validateToken: (token: string) =>
      fetchApi(`${API_BASE}/auth/validate`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ token }),
      }),
  },

  productos: {
    getAll: () => fetchApi(`${API_BASE}/productos`),
    getOne: (id: string) => fetchApi(`${API_BASE}/productos/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/productos`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: any) =>
      fetchApi(`${API_BASE}/productos/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchApi(`${API_BASE}/productos/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  categorias: {
    getAll: () => fetchApi(`${API_BASE}/categorias`),
    getOne: (id: number) => fetchApi(`${API_BASE}/categorias/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/categorias`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/categorias/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/categorias/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  etiquetas: {
    getAll: () => fetchApi(`${API_BASE}/etiquetas`),
    getOne: (id: number) => fetchApi(`${API_BASE}/etiquetas/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/etiquetas`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/etiquetas/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/etiquetas/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  tiendas: {
    getAll: () => fetchApi(`${API_BASE}/tiendas`),
    getOne: (id: number) => fetchApi(`${API_BASE}/tiendas/${id}`),
    getByProductor: (id_productor: number) =>
      fetchApi(`${API_BASE}/tiendas/productor/${id_productor}`),
    getByEstado: (estado: string) =>
      fetchApi(`${API_BASE}/tiendas/estado/${estado}`),
    getByNombre: (nombre: string) =>
      fetchApi(`${API_BASE}/tiendas/buscar/${nombre}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/tiendas`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/tiendas/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/tiendas/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  productores: {
    getAll: () => fetchApi(`${API_BASE}/productores-new`),
    getOne: (id: number) => fetchApi(`${API_BASE}/productores-new/${id}`),
    getByUsuario: (id_usuario: string) =>
      fetchApi(`${API_BASE}/productores-new/usuario/${id_usuario}`),
    getByUbicacion: (ubicacion: string) =>
      fetchApi(`${API_BASE}/productores-new/ubicacion/${ubicacion}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/productores-new`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/productores-new/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/productores-new/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  pedidos: {
    getAll: () => fetchApi(`${API_BASE}/pedidos`),
    getOne: (id: string) => fetchApi(`${API_BASE}/pedidos/${id}`),
    getByUsuario: (usuarioId: string) =>
      fetchApi(`${API_BASE}/usuarios/${usuarioId}/pedidos`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/pedidos`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: any) =>
      fetchApi(`${API_BASE}/pedidos/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchApi(`${API_BASE}/pedidos/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  envios: {
    getAll: () => fetchApi(`${API_BASE}/envios`),
    getOne: (id: number) => fetchApi(`${API_BASE}/envios/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/envios`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/envios/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/envios/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  pagos: {
    getAll: () => fetchApi(`${API_BASE}/pagos`),
    getOne: (id: string) => fetchApi(`${API_BASE}/pagos/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/pagos`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: any) =>
      fetchApi(`${API_BASE}/pagos/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchApi(`${API_BASE}/pagos/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  metodosPago: {
    getAll: () => fetchApi(`${API_BASE}/metodos-pago`),
    getOne: (id: number) => fetchApi(`${API_BASE}/metodos-pago/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/metodos-pago`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/metodos-pago/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/metodos-pago/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  carritos: {
    getAll: () => fetchApi(`${API_BASE}/carritos`),
    getOne: (id: string) => fetchApi(`${API_BASE}/carritos/${id}`),
    getByUsuario: (usuarioId: string) =>
      fetchApi(`${API_BASE}/usuarios/${usuarioId}/carritos`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/carritos`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchApi(`${API_BASE}/carritos/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  carritoItems: {
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/carritos-items`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/carritos-items/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/carritos-items/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  inventario: {
    getAll: () => fetchApi(`${API_BASE}/inventario`),
    getOne: (id: string) => fetchApi(`${API_BASE}/inventario/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/inventario`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: any) =>
      fetchApi(`${API_BASE}/inventario/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: string) =>
      fetchApi(`${API_BASE}/inventario/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  resenas: {
    getAll: () => fetchApi(`${API_BASE}/resenas`),
    getOne: (id: number) => fetchApi(`${API_BASE}/resenas/${id}`),
    getByProducto: (productoId: string) =>
      fetchApi(`${API_BASE}/productos/${productoId}/resenas`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/resenas`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/resenas/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/resenas/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  lotes: {
    getAll: () => fetchApi(`${API_BASE}/lotes`),
    getOne: (id: number) => fetchApi(`${API_BASE}/lotes/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/lotes`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/lotes/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/lotes/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },

  imagenes: {
    getAll: () => fetchApi(`${API_BASE}/imagenes-producto`),
    getOne: (id: number) => fetchApi(`${API_BASE}/imagenes-producto/${id}`),
    create: (token: string, data: any) =>
      fetchApi(`${API_BASE}/imagenes-producto`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    update: (token: string, id: number, data: any) =>
      fetchApi(`${API_BASE}/imagenes-producto/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(data),
      }),
    delete: (token: string, id: number) =>
      fetchApi(`${API_BASE}/imagenes-producto/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }),
  },
};
