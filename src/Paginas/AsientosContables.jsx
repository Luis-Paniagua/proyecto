import React, { useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
export function AsientosContables() {
  const [formulario, setFormulario] = useState({
    cuenta: "",
    debe: "",
    haber: "",
    descripcion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [lista, setLista] = useState([]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const registrarAsiento = async () => {
    setMensaje("");
    setError("");

    const params = new URLSearchParams(formulario).toString();

    try {
      const res = await fetch(
        `https://localhost:7163/api/Asientos/crear?${params}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setMensaje(data.mensaje);
      setFormulario({
        cuenta: "",
        debe: "",
        haber: "",
        descripcion: "",
      });
      listarAsientos();
    } catch (err) {
      setError(err.message);
    }
  };

  const listarAsientos = async () => {
    try {
      const res = await fetch("https://localhost:7163/api/Asientos/listar");
      const data = await res.json();
      setLista(data);
    } catch (err) {
      console.error("Error al listar:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Asientos Contables</h2>
      <div className="card p-3 mb-4">
        <div className="form-group mb-2">
          <input
            className="form-control"
            type="text"
            name="cuenta"
            placeholder="Cuenta"
            value={formulario.cuenta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <input
            className="form-control"
            type="number"
            name="debe"
            placeholder="Debe"
            value={formulario.debe}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <input
            className="form-control"
            type="number"
            name="haber"
            placeholder="Haber"
            value={formulario.haber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <input
            className="form-control"
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={registrarAsiento} className="btn btn-primary mb-2">
          Registrar Asiento
        </button>
        <button onClick={listarAsientos} className="btn btn-secondary ms-2">
          Listar Asientos
        </button>

        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cuenta</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a.id}>
              <td>{a.cuenta}</td>
              <td>{a.debe}</td>
              <td>{a.haber}</td>
              <td>{a.descripcion}</td>
              <td>{new Date(a.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BotonVolverInicio></BotonVolverInicio>
    </div>
  );
}
