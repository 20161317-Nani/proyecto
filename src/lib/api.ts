const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Productos
  products: {
    getAll: () => fetch(`${API_BASE}/products`).then(r => r.json()),
    getOne: (id: string) => fetch(`${API_BASE}/products/${id}`).then(r => r.json()),
    create: (token: string, data: any) => 
      fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()),
  },

  // Órdenes
  orders: {
    getMyOrders: (token: string) =>
      fetch(`${API_BASE}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()),
    create: (token: string, data: any) =>
      fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r.json()),
  },

  // Carrito
  cart: {
    getCart: (token: string) =>
      fetch(`${API_BASE}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()),
    addItem: (token: string, productId: string, quantity: number) =>
      fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
      }).then(r => r.json()),
  },

  // Autenticación
  auth: {
    googleLogin: () => window.location.href = `${API_BASE}/auth/google`,
    getProfile: (token: string) =>
      fetch(`${API_BASE}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()),
  },

  // Usuarios
  users: {
    getById: (id: string) =>
      fetch(`${API_BASE}/users/${id}`).then(r => r.json()),
  }
};