import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateRestaurant.css"; // Archivo CSS para estilos personalizados

export const CreateRestaurant = () => {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    openingHour: "",
    closingHour: "",
    foodType: "Hamburguesa",
    description: "",
    icon: null,
    province: "",
    canton: "",
    district: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleFileChange = (e) => {
    setRestaurantData({ ...restaurantData, icon: e.target.files[0] });
  };

  const handleCreateMenu = () => {
    navigate("/createMenu");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío
    alert("Solicitud enviada para revisión");
    navigate("/home");
  };

  return (
    <div className="container mt-5 shadow-lg rounded-4 p-4 bg-white">
      <Link className="btn btn-dark mb-3" to="/home">
        Regresar
      </Link>
      <div className="text-center mb-4">
        <img
          src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
          alt="FoodFinder Logo"
          style={{ width: "200px" }}
        />
      </div>
      <h2 className="text-center mb-4">Crear restaurante</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={restaurantData.name}
            onChange={handleInputChange}
            placeholder="Un nombre de restaurante"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Hora de apertura</label>
            <input
              type="time"
              className="form-control"
              name="openingHour"
              value={restaurantData.openingHour}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Hora de cierre</label>
            <input
              type="time"
              className="form-control"
              name="closingHour"
              value={restaurantData.closingHour}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de comida</label>
          <select
            className="form-select"
            name="foodType"
            value={restaurantData.foodType}
            onChange={handleInputChange}
          >
            <option>Hamburguesa</option>
            <option>Pizza</option>
            <option>Sushi</option>
            <option>Pasta</option>
            <option>Pollo</option>
            <option>Postre</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="description"
            value={restaurantData.description}
            onChange={handleInputChange}
            rows="3"
            placeholder="Descripción del restaurante"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ícono</label>
          <input
            type="file"
            className="form-control"
            name="icon"
            onChange={handleFileChange}
          />
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Provincia</label>
            <select
              className="form-select"
              name="province"
              value={restaurantData.province}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option>San José</option>
              <option>Alajuela</option>
              <option>Cartago</option>
              <option>Heredia</option>
              <option>Guanacaste</option>
              <option>Puntarenas</option>
              <option>Limón</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Cantón</label>
            <select
              className="form-select"
              name="canton"
              value={restaurantData.canton}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar...</option>
              {/* Opciones dinámicas según la provincia */}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Distrito</label>
            <select
              className="form-select"
              name="district"
              value={restaurantData.district}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar...</option>
              {/* Opciones dinámicas según el cantón */}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            type="button"
            className="btn btn-dark btn-lg"
            onClick={handleCreateMenu}
          >
            Menú
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Solicitar
          </button>
        </div>
        <p className="text-muted text-center mt-3">
          Se enviará una solicitud que deberá ser revisada por un administrador
        </p>
      </form>
    </div>
  );
};
