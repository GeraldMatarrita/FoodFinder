import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export const Search = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
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
          <button className="btn btn-primary btn-lg">Buscar</button>
        </div>
        <div className="d-flex" style={{ flex: 1, marginLeft: "50px" }}>
          <img
            src={require("../../assets/icons/admin.png")}
            alt="Administrator"
            className="icon"
          />
          <button className="btn btn-dark ms-4 btn-lg" onClick={handleLogout}>
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

      {/* Ubicación */}
      <h4 className="text-left mb-4">Filtrar por ubicación</h4>
      <section className="filters-section">
        <div className="filters-container">
          <select className="form-select">
            <option hidden value="">
              Provincia
            </option>
            <option value="sanJose">San Jose</option>
            <option value="sanJose">Alajuela</option>
            <option value="cartago">Cartago</option>
            <option value="heredia">Heredia</option>
            <option value="guanacaste">Guanacaste</option>
            <option value="puntarenas">Puntarenas</option>
            <option value="limon">Limon</option>
          </select>
          <select className="form-select">
            <option hidden value="">
              Cantón
            </option>
            <option value="canton1">Cantón 1</option>
            <option value="canton2">Cantón 2</option>
          </select>
          <select className="form-select">
            <option hidden value="">
              Distrito
            </option>
            <option value="distrito1">Distrito 1</option>
            <option value="distrito2">Distrito 2</option>
          </select>
        </div>
      </section>

      {/* Resultados */}
      <section>
        <h4>Resultados</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="hamburguer-restaurant restaurant-card shadow"
            onClick={handleRestaurantClick}>
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
