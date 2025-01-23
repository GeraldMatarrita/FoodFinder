import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewCheck.css";

export const ReviewCheck = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    alert("Reseña aceptada.");
    // Aquí puedes manejar la lógica para aceptar la reseña
  };

  const handleReject = () => {
    alert("Reseña rechazada.");
    // Aquí puedes manejar la lógica para rechazar la reseña
  };

  return (
    <div className="review-container shadow-lg rounded-4 p-4 bg-white">
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
      <h4 className="text-center">Revisión de reseñas</h4>
      <div className="review-card mt-4">
        <h5>Gerald Matarrita</h5>
        <p className="report-reason">
          Quiero reportar este comentario porque es muy explícito y no aporta
          nada.
        </p>
        <div className="review-content">
          <div className="review-author">Pedro Picapiedra</div>
          <p>Este restaurante es una !#$&</p>
          <span className="review-rating">1 ★</span>
        </div>
        <div className="review-actions">
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
