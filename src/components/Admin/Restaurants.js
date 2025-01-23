import React from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurants.css";

export const Restaurants = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    alert("Solicitud aceptada.");
    // Aquí puedes manejar la lógica para aceptar la solicitud
  };

  const handleReject = () => {
    alert("Solicitud rechazada.");
    // Aquí puedes manejar la lógica para rechazar la solicitud
  };

  return (
    <div className="restaurants-container shadow-lg rounded-4 p-4 bg-white">
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
      <h4 className="text-center">Revisión de restaurantes</h4>
      <div className="restaurant-card2 mt-4">
        <h5>Gerald Matarrita</h5>
        <p className="owner-description">
          Soy propietario del restaurante Rey Hamburguesa y quiero agregar un
          nuevo restaurante en San Pablo. Mi número de folio es 64132123 y mi
          cédula es 1232139123.
        </p>
        <div className="restaurant-details">
          <h6>Rey Hamburguesa San Pablo</h6>
          <p><strong>Tipo de comida:</strong> Hamburguesa</p>
          <p><strong>Hora de apertura:</strong> 10:00am</p>
          <p><strong>Hora de cierre:</strong> 7:00pm</p>
          <p><strong>Descripción:</strong> Un nuevo restaurante, igual que el otro, pero mejor.</p>
          <p><strong>Ubicación:</strong> Heredia, San Pablo, San Francisco.</p>
          <p><strong>Menú:</strong></p>
          <ul>
            <li>Arroz con pollo mejorado (₡2500): Añadimos papas.</li>
            <li>Guoper mejorada (₡7000): Incluimos servilletas.</li>
          </ul>
        </div>
        <div className="restaurant-actions">
          <button className="btn btn-success" onClick={handleAccept}>
            Aceptar
          </button>
          <button className="btn btn-danger" onClick={handleReject}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};
