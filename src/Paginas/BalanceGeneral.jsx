import React, { useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
export function BalanceGeneral() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");

  const obtenerBalance = async () => {
    setError("");
    setDatos(null);
    try {
      const response = await fetch(
        "https://localhost:7163/api/BalanceGeneral/obtener"
      );

      if (!response.ok) {
        const mensajeError = await response.text();
        throw new Error(mensajeError);
      }

      const data = await response.json();
      setDatos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Balance General</h2>
      <div className="text-center">
        <button className="btn btn-primary mb-3" onClick={obtenerBalance}>
          Obtener Balance
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {datos && (
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Activos</th>
              <th>Pasivos</th>
              <th>Patrimonio</th>
              <th>Pasivos + Patrimonio</th>
              <th>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{datos.activos.toFixed(2)}</td>
              <td>{datos.pasivos.toFixed(2)}</td>
              <td>{datos.patrimonio.toFixed(2)}</td>
              <td>{datos.totalPasivoPatrimonio.toFixed(2)}</td>
              <td
                style={{
                  color: datos.diferencia === 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {datos.diferencia.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <BotonVolverInicio></BotonVolverInicio>
    </div>
  );
}
