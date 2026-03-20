export default function InventarioUI() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Inventarios</h1>
          <p className="text-gray-500 text-sm">
            Administra el stock y existencias de mezcales
          </p>
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          + Nuevo Producto
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        {[
          { label: "Productos activos", value: 18 },
          { label: "Agotados", value: 3 },
          { label: "Borradores", value: 5 },
          { label: "Artesanales", value: 12 },
          { label: "Ancestrales", value: 6 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* FILTROS */}
      <div className="flex gap-4 mt-6 items-center">
        <input
          placeholder="Buscar mezcal o maestro..."
          className="border p-2 rounded-lg w-1/3"
        />

        <select className="border p-2 rounded-lg">
          <option>Tipo: Todos</option>
        </select>

        <select className="border p-2 rounded-lg">
          <option>Agave: Todos</option>
        </select>

        <button className="border px-3 py-2 rounded-lg">
          Otros filtros
        </button>

        <button className="border px-3 py-2 rounded-lg">
          Exportar CSV
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-sm mt-6 p-4">
        <table className="w-full text-left">
          
          {/* HEADER TABLA */}
          <thead className="text-gray-500 text-sm">
            <tr>
              <th>Producto</th>
              <th>Maestro & Tipo</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>

          {/* FILAS */}
          <tbody>
            
            {/* FILA 1 */}
            <tr className="border-t">
              <td>
                <p className="font-medium">Mezcal Espadín Joven</p>
                <span className="text-xs text-gray-500">
                  750ml · Santiago Matatlán
                </span>
              </td>

              <td>
                <p>Beto Valenzuela</p>
                <span className="text-green-600 text-xs">
                  ARTESANAL
                </span>
              </td>

              <td>$850.00</td>

              <td>
                <div className="flex items-center gap-2">
                  <span className="text-sm">45 u.</span>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div className="bg-green-500 h-2 rounded w-[80%]" />
                  </div>
                </div>
              </td>

              <td className="text-green-500 font-medium">
                ● ACTIVO
              </td>
            </tr>

            {/* FILA 2 */}
            <tr className="border-t">
              <td>
                <p className="font-medium">Mezcal Tobalá</p>
                <span className="text-xs text-gray-500">
                  750ml · Santa Catarina Minas
                </span>
              </td>

              <td>
                <p>Lalo Ángeles</p>
                <span className="text-orange-500 text-xs">
                  ANCESTRAL
                </span>
              </td>

              <td>$1,420.00</td>

              <td>
                <div className="flex items-center gap-2">
                  <span className="text-sm">5 u.</span>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div className="bg-yellow-500 h-2 rounded w-[12%]" />
                  </div>
                </div>
              </td>

              <td className="text-yellow-500 font-medium">
                ● BAJO STOCK
              </td>
            </tr>

            {/* FILA 3 */}
            <tr className="border-t">
              <td>
                <p className="font-medium">Mezcal Tepeztate Silvestre</p>
                <span className="text-xs text-gray-500">
                  750ml · Ejutla de Crespo
                </span>
              </td>

              <td>
                <p>Beto Valenzuela</p>
                <span className="text-green-600 text-xs">
                  ARTESANAL
                </span>
              </td>

              <td>$1,850.00</td>

              <td>
                <div className="flex items-center gap-2">
                  <span className="text-sm">0 u.</span>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div className="bg-red-500 h-2 rounded w-[0%]" />
                  </div>
                </div>
              </td>

              <td className="text-red-500 font-medium">
                ● AGOTADO
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}