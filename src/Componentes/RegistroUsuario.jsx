import { useState } from "react";
import { BotonVolverInicio } from "../Componentes/Volver";
export function RegistrarUsuario() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    correo: "",
    telefono: "",
    direccion: "",
    rol: "Contador",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormulario({
      formulario,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = async () => {
    const params = new URLSearchParams(formulario).toString();
    const res = await fetch(
      `https://localhost:7163/api/Usuarios/crear?${params}`,
      {
        method: "POST",
      }
    );

    if (res.ok) {
      const data = await res.json();
      setMensaje(data.mensaje);
      setFormulario({
        nombre: "",
        apellido: "",
        usuario: "",
        contrasena: "",
        correo: "",
        telefono: "",
        direccion: "",
        rol: "Contador",
      });
    } else {
      const error = await res.text();
      setMensaje(error);
    }
  };

  return (
    <>
      <h2>Registrar Usuario</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={formulario.nombre}
        onChange={handleChange}
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={formulario.apellido}
        onChange={handleChange}
      />
      <input
        name="usuario"
        placeholder="Usuario"
        value={formulario.usuario}
        onChange={handleChange}
      />
      <input
        name="contrasena"
        type="password"
        placeholder="Contraseña"
        value={formulario.contrasena}
        onChange={handleChange}
      />
      <input
        name="correo"
        placeholder="Correo"
        value={formulario.correo}
        onChange={handleChange}
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={formulario.telefono}
        onChange={handleChange}
      />
      <input
        name="direccion"
        placeholder="Dirección"
        value={formulario.direccion}
        onChange={handleChange}
      />
      <select name="rol" value={formulario.rol} onChange={handleChange}>
        <option value="Contador">Contador</option>
        <option value="Administrador">Administrador</option>
        <option value="Auditor">Auditor</option>
      </select>

      <br />
      <button onClick={registrar}>Registrar</button>
      <p>{mensaje}</p>
    </>
  );
}

export function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const listar = async () => {
    const res = await fetch("https://localhost:7163/api/Usuarios/listar");
    const data = await res.json();
    setUsuarios(data);
  };

  return (
    <>
      <h2>Lista de Usuarios</h2>
      <button onClick={listar}>Cargar Usuarios</button>

      {usuarios.length > 0 && (
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.usuario}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td>{u.direccion}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  
    </>
  );
}
<button><BotonVolverInicio></BotonVolverInicio></button>