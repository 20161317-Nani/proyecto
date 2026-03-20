export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-900 text-white p-4">
        <h1 className="text-lg font-bold mb-6">Mezcal Pro</h1>

        <nav className="flex flex-col gap-3 text-sm">
          <span>🏠 Inicio</span>
          <span>👤 Mi perfil</span>
          <span>📦 Productos</span>
          <span>📊 Inventario</span>

          <span className="bg-green-700 p-2 rounded-lg">
            🛒 Pedidos
          </span>

          <span>👥 Usuarios</span>
          <span>🏪 Tiendas</span>
          <span>📈 Reportes</span>
          <span>⚙️ Configuración</span>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Gestión de Pedidos
            </h1>
            <p className="text-gray-500 text-sm">
              Administra y gestiona las órdenes
            </p>
          </div>

          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            + Nuevo Pedido
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          {[
            { label: "Total Pedidos", value: "1,284" },
            { label: "Pendientes", value: "45" },
            { label: "Enviados", value: "128" },
            { label: "Completados", value: "1,056" },
            { label: "Cancelados", value: "55" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* FILTROS */}
        <div className="flex gap-4 mt-6 items-center">
          <input
            placeholder="Buscar por ID, cliente o producto..."
            className="border p-2 rounded-lg w-1/3"
          />

          <button className="border px-3 py-2 rounded-lg">
            Filtros
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow-sm mt-6 p-4">
          <table className="w-full text-left">

            <thead className="text-gray-500 text-sm">
              <tr>
                <th className="py-3">ID Pedido</th>
                <th className="py-3">Cliente</th>
                <th className="py-3">Fecha</th>
                <th className="py-3">Total</th>
                <th className="py-3">Estado</th>
                <th className="py-3">Acciones</th>
              </tr>
            </thead>

            <tbody>

              {/* FILA */}
              <tr className="border-t hover:bg-gray-50 transition">
                <td className="py-4 font-medium">#MZ-2041</td>

                <td className="py-4 flex items-center gap-2">
                  <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-full text-xs">
                    JR
                  </span>
                  Julián Rivera
                </td>

                <td className="py-4">12/10/2023</td>
                <td className="py-4">$1,450.00 MXN</td>

                <td className="py-4">
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                    Pendiente
                  </span>
                </td>

                <td className="py-4">✏️ 🗑️</td>
              </tr>

              {/* FILA */}
              <tr className="border-t hover:bg-gray-50 transition">
                <td className="py-4 font-medium">#MZ-2038</td>

                <td className="py-4 flex items-center gap-2">
                  <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs">
                    MA
                  </span>
                  María Alcaraz
                </td>

                <td className="py-4">11/10/2023</td>
                <td className="py-4">$2,100.00 MXN</td>

                <td className="py-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                    Enviado
                  </span>
                </td>

                <td className="py-4">✏️ 🗑️</td>
              </tr>

              {/* FILA */}
              <tr className="border-t hover:bg-gray-50 transition">
                <td className="py-4 font-medium">#MZ-2035</td>

                <td className="py-4 flex items-center gap-2">
                  <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs">
                    ST
                  </span>
                  Sergio Torres
                </td>

                <td className="py-4">10/10/2023</td>
                <td className="py-4">$3,450.00 MXN</td>

                <td className="py-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Completado
                  </span>
                </td>

                <td className="py-4">✏️ 🗑️</td>
              </tr>

              {/* FILA */}
              <tr className="border-t hover:bg-gray-50 transition">
                <td className="py-4 font-medium">#MZ-2030</td>

                <td className="py-4 flex items-center gap-2">
                  <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xs">
                    LG
                  </span>
                  Laura Gómez
                </td>

                <td className="py-4">09/10/2023</td>
                <td className="py-4">$890.00 MXN</td>

                <td className="py-4">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                    Cancelado
                  </span>
                </td>

                <td className="py-4">✏️ 🗑️</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}