import React, { useState } from "react";

export function Login({ onLogin }) {
  const [form, setForm] = useState({ usuario: "", contrasena: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const params = new URLSearchParams(form).toString();

    try {
      const res = await fetch(
        `https://localhost:7163/api/Usuarios/login?${params}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      onLogin(data); // Para manejar sesión o redirigir
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          className="form-control mb-2"
          value={form.usuario}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className="form-control mb-2"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Entrar
        </button>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}
