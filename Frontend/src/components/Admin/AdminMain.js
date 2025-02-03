import React from "react";
import { Link } from "react-router-dom";
import "./AdminMain.css"; // Archivo CSS para estilos personalizados

export const AdminMain = () => {


  return (
    <div className="admin-container shadow-lg rounded-4 p-4 bg-white">
        <Link to="/home" className="btn btn-dark mb-3">
          Regresar
        </Link>
      <div className="text-center">
        <img
          src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
          alt="FoodFinder Logo"
          style={{ width: "400px" }}
        />
      </div>
      <h2 className="text-center mt-4">Administración</h2>
      <div className="button-container">
        <Link className="btn btn-primary admin-button" to="/admin/reviews">
          Revisión de Reseñas
        </Link>
        <Link
          className="btn btn-dark admin-button"
          to="/admin/restaurants"
        >
          Solicitudes de Restaurantes
        </Link>
        <Link className="btn btn-info admin-button" to="/admin/users">
          Usuarios
        </Link>
      </div>
    </div>
  );
};
