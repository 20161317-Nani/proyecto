"use client";

import { useEffect, useState } from "react";
import { testBackendConnection } from "@/lib/test-api";

export default function TestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setLogs([]);

    // Capturar logs en la consola
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      setLogs((prev) => [...prev, String(args.join(" "))]);
      originalLog(...args);
    };

    console.error = (...args) => {
      setLogs((prev) => [...prev, "❌ " + String(args.join(" "))]);
      originalError(...args);
    };

    await testBackendConnection();

    console.log = originalLog;
    console.error = originalError;

    setLoading(false);
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Test Backend Connection</h1>

      <button
        onClick={runTest}
        disabled={loading}
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Probando..." : "Probar Conexión"}
      </button>

      <div className="bg-gray-900 text-green-400 p-6 rounded font-mono text-sm overflow-auto">
        {logs.length === 0 ? (
          <p>Haz clic en el botón para probar...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-2">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
