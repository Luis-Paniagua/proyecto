import React from "react";
import { useNavigate } from "react-router-dom";

export function BotonVolverInicio() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="btn btn-outline-primary mt-4"
    >
      ⬅ Volver al inicio
    </button>
  );
}
