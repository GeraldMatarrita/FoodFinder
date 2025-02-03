import React from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

export const Users = () => {
  const navigate = useNavigate();

  const handleSuspend = (userName) => {
    alert(`El usuario ${userName} ha sido suspendido.`);
    // Aquí puedes manejar la lógica para suspender el usuario
  };

  const handleDelete = (userName) => {
    alert(`El usuario ${userName} ha sido eliminado.`);
    // Aquí puedes manejar la lógica para eliminar el usuario
  };

  const users = [
    { name: "Gerald Matarrita", email: "geramatarr@gmail.com" },
    { name: "Pablo Marmol", email: "pablito2@correo.com" },
    { name: "Pedro Picapiedra", email: "romperocas200@gmail.com" },
  ];

  return (
    <div className="users-container shadow-lg rounded-4 p-4 bg-white">
      <button onClick={() => navigate(-1)} className="btn btn-dark mb-3">
        Regresar
      </button>
      <div className="text-center">
        <img
          src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
          alt="FoodFinder Logo"
          style={{ width: "400px" }}
        />
      </div>
      <h2 className="text-center mt-4">Administración</h2>
      <h4 className="text-center">Usuarios</h4>
      {users.map((user, index) => (
        <div className="user-card mt-4" key={index}>
          <h5>{user.name}</h5>
          <p>Correo: {user.email}</p>
          <div className="user-actions">
            <button
              className="btn btn-warning"
              onClick={() => handleSuspend(user.name)}
            >
              Suspender
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user.name)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
