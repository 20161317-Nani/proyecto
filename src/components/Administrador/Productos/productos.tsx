"use client";

import { useEffect, useState } from "react";

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion?: string;
    precio_base: number;
    stock: number;
    status: string;
    tipo?: string;
    productor?: string;
}

export default function ProductosAdmin() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [search, setSearch] = useState("");

    //  CONEXIÓN REAL A TU BACKEND
    useEffect(() => {
        fetch("http://localhost:3000/productos")
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA BACKEND:", data);

                const productosArray = Array.isArray(data)
                    ? data
                    : data.productos || data.data || [];

                const transformados: Producto[] = productosArray.map((p: any) => ({
                    id_producto: p.id_producto,
                    nombre: p.nombre,
                    descripcion: p.descripcion,
                    precio_base: Number(p.precio_base),
                    stock: 0,
                    status: p.status || "activo",
                    tipo: "mezcal",
                    productor: "N/A",
                }));

                setProductos(transformados);
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    const filtered = productos.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                    <p className="text-gray-500">
                        Administra los productos de mezcal
                    </p>
                </div>

                <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
                    + Nuevo Producto
                </button>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-3 gap-4">
                <Card title="Total productos" value={productos.length} />
                <Card
                    title="Bajo stock"
                    value={productos.filter((p) => p.stock < 10).length}
                />
                <Card
                    title="Activos"
                    value={productos.filter((p) => p.status === "activo").length}
                />
            </div>

            {/* FILTRO */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className="border p-2 rounded w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left text-sm">
                        <tr>
                            <th className="p-3">Producto</th>
                            <th className="p-3">Productor</th>
                            <th className="p-3">Precio</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p.id_producto} className="border-t">
                                <td className="p-3">
                                    <p className="font-medium">{p.nombre}</p>
                                    <span className="text-xs text-gray-500">
                                        {p.tipo}
                                    </span>
                                </td>

                                <td className="p-3">{p.productor}</td>

                                <td className="p-3">
                                    ${p.precio_base.toFixed(2)}
                                </td>

                                <td className="p-3">
                                    {p.stock} u.
                                    <div className="h-2 bg-gray-200 rounded mt-1">
                                        <div
                                            className={`h-2 rounded ${p.stock > 10
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                                }`}
                                            style={{ width: `${Math.min(p.stock * 2, 100)}%` }}
                                        />
                                    </div>
                                </td>

                                <td className="p-3">
                                    <EstadoBadge status={p.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//  COMPONENTES AUXILIARES

function Card({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-xl font-bold">{value}</h2>
        </div>
    );
}

function EstadoBadge({ status }: { status: string }) {
    const styles =
        status === "activo"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600";

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${styles}`}>
            {status.toUpperCase()}
        </span>
    );
}

