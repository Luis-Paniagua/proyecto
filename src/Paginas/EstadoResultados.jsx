import React, { useEffect, useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
export function EstadoResultados() {
  const [estado, setEstado] = useState(null);
  const [error, setError] = useState("");

  const obtenerEstadoResultados = async () => {
    try {
      const res = await fetch("https://localhost:7163/api/EstadoResultados");
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setEstado(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    obtenerEstadoResultados();
  }, []);

  if (error) return <p className="text-danger">Error: {error}</p>;

  if (!estado) return <p>Cargando estado de resultados...</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-center">Estado de Resultados</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Concepto</th>
            <th>Monto (Bs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ingresos</td>
            <td>{estado.ingresos.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Gastos</td>
            <td>{estado.egresos.toFixed(2)}</td>
          </tr>
          <tr className="table-info">
            <td>
              <strong>Utilidad Neta</strong>
            </td>
            <td>
              <strong>{estado.utilidad.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <BotonVolverInicio></BotonVolverInicio>
    </div>
  );
}
