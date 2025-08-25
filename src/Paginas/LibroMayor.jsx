import React, { useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
export function LibroMayor() {
  const [data, setData] = useState([]);

  const fetchLibroMayor = async () => {
    const response = await fetch(
      "https://localhost:7163/api/LibroMayor/listar"
    );
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="container mt-4">
      <h2>Libro Mayor</h2>
      <button className="btn btn-primary mb-3" onClick={fetchLibroMayor}>
        Ver Libro Mayor
      </button>

      {data.map((cuenta, i) => (
        <div key={i} className="card mb-3">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Cuenta: {cuenta.cuenta}</h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Debe</th>
                  <th>Haber</th>
                </tr>
              </thead>
              <tbody>
                {cuenta.movimientos.map((mov, index) => (
                  <tr key={index}>
                    <td>{mov.fecha}</td>
                    <td>{mov.descripcion}</td>
                    <td>{mov.debe}</td>
                    <td>{mov.haber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <BotonVolverInicio></BotonVolverInicio>
    </div>
  );
}
