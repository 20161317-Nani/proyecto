"use client";

import { useEffect, useState } from "react";

// 1. Interfaz fiel a tu pgAdmin
interface Producto {
    id_producto: number;
    id_productor: number;
    id_tienda: number;
    id_lote: number | null;
    nombre: string;
    descripcion: string;
    precio_base: string | number;
    moneda: string;
    status: string;
    stock?: number;
    // Agregamos productor opcional para el diseño
    productor_nombre?: string; 
    categoria_nombre?: string;
}

export default function ProductosAdmin() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Estados para los filtros de diseño
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [filtroEstado, setFiltroEstado] = useState("todos");

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/productos")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error en la petición:", err);
                setLoading(false);
            });
    }, []);

    // Lógica de filtrado (Nombre + Filtros de diseño)
    const filtered = productos.filter((p) => {
        const matchesName = p.nombre.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filtroEstado === "todos" || p.status.toLowerCase() === filtroEstado.toLowerCase();
        // Nota: El filtro de tipo se aplicará cuando el backend traiga la relación de categorías
        return matchesName && matchesStatus;
    });

    if (loading) return <div className="p-6 text-center">Cargando catálogo de mezcal...</div>;

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                    <p className="text-gray-500">Administra los mezcales desde PostgreSQL</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
                    + Nuevo Producto
                </button>
            </div>

            {/* CARDS DINÁMICAS */}
            <div className="grid grid-cols-3 gap-4">
                <Card title="Total productos" value={productos.length} />
                <Card 
                    title="En catálogo" 
                    value={productos.filter(p => p.status === 'activo').length} 
                />
                <Card 
                    title="Productores" 
                    value={new Set(productos.map(p => p.id_productor)).size} 
                />
            </div>

            {/* SECCIÓN DE BÚSQUEDA Y FILTROS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                {/* Buscador Principal */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar mezcal por nombre..."
                        className="border p-3 rounded-xl w-full focus:ring-2 focus:ring-green-500 outline-none pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
                </div>

                {/* Filtros de Diseño */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Tipo de Mezcal</label>
                        <select 
                            className="border p-2 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="todos">Todos los tipos</option>
                            <option value="espadin">Espadín</option>
                            <option value="tobala">Tobalá</option>
                            <option value="reposado">Reposado</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Estado</label>
                        <select 
                            className="border p-2 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="todos">Cualquier estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button 
                            onClick={() => {setSearch(""); setFiltroTipo("todos"); setFiltroEstado("todos");}}
                            className="text-sm text-gray-500 hover:text-green-600 transition mb-2 ml-2"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left text-sm text-gray-600">
                        <tr>
                            <th className="p-3">Producto</th>
                            <th className="p-3">Productor</th>
                            <th className="p-3">Precio</th>
                            <th className="p-3">Moneda</th>
                            <th className="p-3">Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p.id_producto} className="border-t hover:bg-gray-50 transition">
                                <td className="p-3">
                                    <p className="font-medium">{p.nombre}</p>
                                    <span className="text-xs text-gray-400 line-clamp-1">
                                        {p.descripcion || "Sin descripción"}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-600">
                                    <span className="text-sm font-semibold">Productor #{p.id_productor}</span>
                                </td>
                                <td className="p-3 font-semibold">
                                    ${Number(p.precio_base).toFixed(2)}
                                </td>
                                <td className="p-3 text-sm text-gray-500">{p.moneda}</td>
                                <td className="p-3">
                                    <EstadoBadge status={p.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="p-10 text-center text-gray-400">
                        No se encontraron productos con los filtros aplicados
                    </div>
                )}
            </div>
        </div>
    );
}

// COMPONENTES AUXILIARES

function Card({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
    );
}

function EstadoBadge({ status }: { status: string }) {
    const isActivo = status.toLowerCase() === "activo";
    const styles = isActivo
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
            {status.toUpperCase()}
        </span>
    );
}