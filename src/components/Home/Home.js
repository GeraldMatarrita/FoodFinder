import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const CategoryItem = ({ category }) => (
    <div
      className={`category-item text-center ${
        selectedCategory === category ? "selected-category" : ""
      }`}
      onClick={() => handleCategoryClick(category)}
    >
      <img
        src={require(`../../assets/categories/${category.toLowerCase()}.png`)}
        alt={category}
        className="category-icon"
      />
      <p style={{ fontWeight: "bold" }}>{category}</p>
    </div>
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRestaurantClick = () => {
    navigate("/restaurant");
  };

  const handleCreateRestaurant = () => {
    navigate("/createRestaurant");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div className="container mt-4 shadow-lg rounded-4 p-5 bg-white">
      {/* Logo y Barra de búsqueda */}
      <header className="d-flex justify-content-between align-items-center mt-2 mb-5">
        <div className="d-flex" style={{ flex: 1 }}>
          <img
            src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
            alt="FoodFinder Logo"
            style={{ width: "330px", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          />
        </div>
        <div
          className="d-flex search-bar"
          style={{ flex: 2, marginLeft: "50px" }}
        >
          <input
            type="text"
            className="form-control me-2 form-control-lg"
            placeholder="Buscar..."
          />
          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Buscar
          </button>
        </div>
        <div 
        className="d-flex" 
        style={{ flex: 1, marginLeft: "50px" }}
        onClick={handleAdminClick}
        >
          <img
            src={require("../../assets/icons/admin.png")}
            alt="Administrator"
            className="icon"
          />
          <button className="btn btn-dark ms-4 btn-lg" id="cerrarSesion" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Categorías */}
      <h4 className="text-left mb-4">Filtrar por categoría</h4>
      <section className="categories mb-4">
        <div className="d-flex justify-content-center">
          {["Pizza", "Hamburguesa", "Sandwich", "Pollo", "Pasta", "Postre"].map(
            (category) => (
              <CategoryItem key={category} category={category} />
            )
          )}
        </div>
      </section>

      {/* Tus Favoritos */}
      <section>
        <h4>Tus Favoritos</h4>
        <div className="row">
          <div className="col-md-4">
            <div
              className="hamburguer-restaurant restaurant-card shadow"
              onClick={handleRestaurantClick}
            >
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/rey hamburguesa.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>Rey Hamburguesa</h5>
                  <p>4.5 ⭐</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="chicken-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/kcf.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>KCF</h5>
                  <p>4.2 ⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tus Restaurantes Registrados*/}
      <section>
        <h4>Tus Restaurantes Registrados</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="hamburguer-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/rey hamburguesa.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>Rey Hamburguesa</h5>
                  <p>4.5 ⭐</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="add-restaurant restaurant-card shadow"
              onClick={handleCreateRestaurant}
            >
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/icons/plus.png")}
                  alt="Restaurant Icon"
                  className="add-restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>Crear Restaurante</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Otros Restaurantes */}
      <section>
        <h4>Otros restaurantes</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="hamburguer-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/rey hamburguesa.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>Rey Hamburguesa</h5>
                  <p>4.5 ⭐</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="chicken-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/kcf.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>KCF</h5>
                  <p>4.2 ⭐</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="chicken-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/kcf.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>KCF</h5>
                  <p>4.2 ⭐</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="chicken-restaurant restaurant-card shadow">
              <div className="restaurant-overlay">
                <img
                  src={require("../../assets/restaurants/kcf.png")}
                  alt="Restaurant Icon"
                  className="restaurant-icon"
                />
                <div className="restaurant-info">
                  <h5>KCF</h5>
                  <p>4.2 ⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
