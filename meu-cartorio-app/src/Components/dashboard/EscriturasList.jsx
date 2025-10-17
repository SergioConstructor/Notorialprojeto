import React from "react";

export default function EscriturasList({ escrituras, isLoading }) {
  if (isLoading) {
    return <div>Carregando escrituras...</div>;
  }
  if (!escrituras || escrituras.length === 0) {
    return <div>Nenhuma escritura encontrada.</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Lista de Escrituras</h2>
      <ul className="divide-y divide-gray-200">
        {escrituras.map((e) => (
          <li key={e.id} className="py-2 flex justify-between items-center">
            <span>{e.titulo || `Escritura #${e.id}`}</span>
            <span className="text-sm text-gray-500">Status: {e.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
