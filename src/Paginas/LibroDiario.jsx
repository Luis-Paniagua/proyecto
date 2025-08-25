import React, { useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function LibroDiario() {
  const [datos, setDatos] = useState([]);

  const cargarLibroDiario = async () => {
    try {
      const respuesta = await fetch(
        "https://localhost:7163/api/LibroDiario/listar"
      );
      const resultado = await respuesta.json();
      setDatos(resultado);
    } catch (err) {
      console.error("Error al cargar Libro Diario:", err);
    }
  };

  const exportarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Libro Diario");
    worksheet.columns = [
      { header: "Fecha", key: "fecha", width: 15 },
      { header: "Cuenta", key: "cuenta", width: 20 },
      { header: "Debe", key: "debe", width: 15 },
      { header: "Haber", key: "haber", width: 15 },
      { header: "Descripción", key: "descripcion", width: 30 },
    ];


    datos.forEach((dia) => {
      dia.asientos.forEach((a) => {
        worksheet.addRow({
          fecha: new Date(dia.fecha).toLocaleDateString(),
          cuenta: a.cuenta,
          debe: a.debe,
          haber: a.haber,
          descripcion: a.descripcion,
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LibroDiario.xlsx");
  };

  return (
    <div className="container mt-4">
      <h2>📘 Libro Diario</h2>

      <div className="mb-3 d-flex gap-2">
        <button onClick={cargarLibroDiario} className="btn btn-primary">
          Cargar Libro Diario
        </button>
        <button onClick={exportarExcel} className="btn btn-success">
          Exportar a Excel
        </button>
      </div>

      {datos.map((dia, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-primary">
            📅 Fecha: {new Date(dia.fecha).toLocaleDateString()}
          </h4>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Cuenta</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {dia.asientos.map((a, i) => (
                <tr key={i}>
                  <td>{a.cuenta}</td>
                  <td>{a.debe}</td>
                  <td>{a.haber}</td>
                  <td>{a.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <BotonVolverInicio />
    </div>
  );
}
