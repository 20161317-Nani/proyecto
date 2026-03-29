export const getProductos = async () => {
  const res = await fetch("http://localhost:3000/productos");

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  return res.json();
};