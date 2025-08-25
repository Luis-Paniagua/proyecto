import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/login";
import { Inicio } from "../Paginas/Inicio";
import { RegistrarUsuario, ListarUsuarios } from "./RegistroUsuario";
import { AsientosContables } from "../Paginas/AsientosContables";
import { LibroDiario } from "../Paginas/LibroDiario";
import { LibroMayor } from "../Paginas/LibroMayor";
import { EstadoResultados } from "../Paginas/EstadoResultados";
import { BalanceGeneral } from "../Paginas/BalanceGeneral";

export function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  if (!usuarioLogueado) {
    return <Login onLogin={setUsuarioLogueado} />;
  }

  const cerrarSesion = () => {
    setUsuarioLogueado(null);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="mb-0">
          Bienvenido, <strong>{usuarioLogueado.nombre}</strong> (
          {usuarioLogueado.rol})
        </p>
        <button className="btn btn-outline-danger" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrar-usuarios" element={<RegistrarUsuario />} />
        <Route path="/asientos" element={<AsientosContables />} />
        <Route path="/libro-diario" element={<LibroDiario />} />
        <Route path="/libro-mayor" element={<LibroMayor />} />
        <Route path="/estado-resultados" element={<EstadoResultados />} />
        <Route path="/balance-general" element={<BalanceGeneral />} />
      </Routes>
    </div>
  );
}
