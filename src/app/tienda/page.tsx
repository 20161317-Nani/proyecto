export default function Page() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Gestión de Tiendas
          </h1>
          <p className="text-gray-500 text-sm">
            Administra las tiendas registradas
          </p>
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          + Nueva Tienda
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: "Total Tiendas", value: 128 },
          { label: "Activas", value: 114 },
          { label: "Inactivas", value: 14 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <p className="text-gray-500 text-sm">
              {item.label}
            </p>
            <h2 className="text-xl font-bold">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTROS */}
      <div className="flex gap-4 mt-6 items-center">
        <input
          placeholder="Buscar por nombre, ubicación o dueño..."
          className="border p-2 rounded-lg w-1/3"
        />

        <button className="border px-3 py-2 rounded-lg">
          Filtrar
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-sm mt-6 p-4">
        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="py-3">Imagen</th>
              <th className="py-3">Tienda</th>
              <th className="py-3">Ubicación</th>
              <th className="py-3">Maestro Mezcalero</th>
              <th className="py-3">Estado</th>
              <th className="py-3">Acciones</th>
            </tr>
          </thead>

          <tbody>

            {/* FILA 1 */}
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </td>

              <td className="py-4">
                <p className="font-medium">
                  Guardianas del Mezcal
                </p>
                <span className="text-xs text-gray-500">
                  ID: #MZ-8821
                </span>
              </td>

              <td className="py-4">
                San Vicente Coatlán,
                <br /> Sierra Sur, Oaxaca
              </td>

              <td className="py-4">Elena Ruiz</td>

              <td className="py-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  ACTIVA
                </span>
              </td>

              <td className="py-4">👁️ ✏️ 🗑️</td>
            </tr>

            {/* FILA 2 */}
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </td>

              <td className="py-4">
                <p className="font-medium">
                  El Maguey Dorado
                </p>
                <span className="text-xs text-gray-500">
                  ID: #MZ-8902
                </span>
              </td>

              <td className="py-4">
                Ejutla de Crespo,
                <br /> Sierra Sur, Oaxaca
              </td>

              <td className="py-4">Pedro Hernández</td>

              <td className="py-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  ACTIVA
                </span>
              </td>

              <td className="py-4">👁️ ✏️ 🗑️</td>
            </tr>

            {/* FILA 3 */}
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </td>

              <td className="py-4">
                <p className="font-medium">
                  Raíces Oaxaqueñas
                </p>
                <span className="text-xs text-gray-500">
                  ID: #MZ-7741
                </span>
              </td>

              <td className="py-4">
                Miahuatlán de Porfirio Díaz,
                <br /> Sierra Sur, Oaxaca
              </td>

              <td className="py-4">Sofía Luna</td>

              <td className="py-4">
                <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs">
                  INACTIVA
                </span>
              </td>

              <td className="py-4">👁️ ✏️ 🗑️</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}