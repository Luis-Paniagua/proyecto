import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaBook, FaChartBar, FaBalanceScale, FaClipboardList, FaHome } from "react-icons/fa";

export function Inicio() {
  const secciones = [
    { ruta: "/registrar-usuarios", texto: "Registrar Usuarios", icono: <FaUserPlus /> },
    { ruta: "/asientos", texto: "Asientos Contables", icono: <FaClipboardList /> },
    { ruta: "/libro-diario", texto: "Libro Diario", icono: <FaBook /> },
    { ruta: "/libro-mayor", texto: "Libro Mayor", icono: <FaChartBar /> },
    { ruta: "/estado-resultados", texto: "Estado de Resultados", icono: <FaBalanceScale /> },
    { ruta: "/balance-general", texto: "Balance General", icono: <FaBalanceScale /> },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 text-primary mb-4 fw-bold">
          Bienvenido al Sistema de Contabilidad
        </h1>
        <p className="lead text-secondary mb-4">
          Navega por las diferentes secciones para gestionar tu contabilidad:
        </p>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {secciones.map((sec, index) => (
            <div key={index} className="col">
              <Link to={sec.ruta} className="text-decoration-none">
                <div className="card shadow-sm border-0 h-100 bg-light hover-zoom">
                  <div className="card-body text-center">
                    <div className="display-5 text-info mb-3">{sec.icono}</div>
                    <h5 className="card-title text-dark">{sec.texto}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
