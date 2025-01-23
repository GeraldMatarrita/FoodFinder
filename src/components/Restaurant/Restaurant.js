import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurant.css";

export const Restaurant = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Pedro Picapiedra",
      comment: "Este restaurante es una !#$$&.",
      rating: 1,
    },
    {
      id: 2,
      name: "Pablo Marmol",
      comment: "Ayer pasé a comer y estuvo delicioso",
      rating: 5,
    },
  ]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });

  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleCommentChange = (e) => {
    setNewReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleAddReview = () => {
    if (newReview.comment && newReview.rating) {
      const newReviewEntry = {
        id: reviews.length + 1,
        name: "Usuario Anónimo",
        comment: newReview.comment,
        rating: newReview.rating,
      };
      setReviews((prev) => [...prev, newReviewEntry]);
      setNewReview({ comment: "", rating: 0 });
    } else {
      alert("Por favor, completa la reseña y selecciona una calificación.");
    }
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
        <div className="d-flex" style={{ flex: 1, marginLeft: "50px" }}>
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
      <section className="container mt-3">
        <button onClick={handleBack} className="btn btn-dark mb-3">
          Regresar
        </button>

        <div className="restaurant-header rounded p-4 mb-3 text-white">
          <div className="row align-items-center">
            <div className="col-md-9">
              <h1 className="restaurant-name mb-0">Rey Hamburguesa</h1>
              <p className="restaurant-description mb-0">
                Un restaurante para ser feliz comiendo hamburguesas como un rey.
              </p>
              <p className="restaurant-location mb-0">
                📍 Heredia | Heredia | San Francisco
              </p>
            </div>
            <div className="col-md-3 text-end">
              <img
                src={require("../../assets/restaurants/rey hamburguesa.png")}
                alt="Restaurant Icon"
                className="restaurant-icon"
              />
              <p className="restaurant-rating mb-0">4.5 ⭐</p>
              <p className="restaurant-hours mb-0">10:00am - 11:00pm</p>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img
            src={require("../../assets/icons/favorite.png")}
            alt="favorite"
            className="icon mb-3 align-right"
            id="favorite"
          />
        </div>

        <nav className="nav mb-3 d-flex justify-content-center">
          <a
            className={`nav-link ${activeTab === "menu" ? "active-tab" : ""}`}
            href="#!"
            onClick={() => setActiveTab("menu")}
          >
            Menú
          </a>
          <a
            className={`nav-link ${
              activeTab === "reviews" ? "active-tab" : ""
            }`}
            href="#!"
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </a>
        </nav>

        {activeTab === "menu" ? (
          <div className="menu-items">
            <div className="menu-item d-flex align-items-center border rounded p-3 mb-3 shadow-sm">
              <img
                src={require("../../assets/food/guoper.png")}
                alt="Guoper"
                className="menu-item-image rounded me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="menu-item-info flex-grow-1">
                <h5 className="menu-item-name mb-1">Guoper</h5>
                <p className="menu-item-description mb-0">
                  La mejor hamburguesa jamás creada
                </p>
              </div>
              <p className="menu-item-price mb-0 text-end">₡4500</p>
            </div>

            <div className="menu-item d-flex align-items-center border rounded p-3 shadow-sm">
              <img
                src={require("../../assets/food/arrozConPollo.png")}
                alt="Arroz con Pollo"
                className="menu-item-image rounded me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="menu-item-info flex-grow-1">
                <h5 className="menu-item-name mb-1">Arroz con Pollo</h5>
                <p className="menu-item-description mb-0">
                  El mejor arroz con siempre para tus fiestas de cumpleaños
                </p>
              </div>
              <p className="menu-item-price mb-0 text-end">₡2300</p>
            </div>
          </div>
        ) : (
          <div className="reviews d-flex">
            <div className="average-rating me-4" style={{ flex: 1 }}>
              <h3 className="text-center">4.5</h3>
              <p className="text-center">⭐⭐⭐⭐⭐</p>
              <p className="text-center">2,256,896 calificaciones</p>
              <div className="rating-distribution">
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">5</span>
                  <div className="progress w-100">
                    <div
                      className="progress-bar bg-success"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">4</span>
                  <div className="progress w-100">
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">3</span>
                  <div className="progress w-100">
                    <div
                      className="progress-bar bg-info"
                      style={{ width: "5%" }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">2</span>
                  <div className="progress w-100">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2">1</span>
                  <div className="progress w-100">
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="review-list" style={{ flex: 2 }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review d-flex align-items-center border rounded p-3 mb-3 shadow-sm"
                >
                  <div className="review-info flex-grow-1">
                    <h5 className="review-user-name mb-1">{review.name}</h5>
                    <p className="review-user-comment mb-0">{review.comment}</p>
                  </div>
                  <p className="review-rating mb-0 text-end">
                    {"⭐".repeat(review.rating)}
                  </p>
                  <button className="btn btn-sm btn-danger ms-3">⚠️</button>
                </div>
              ))}

              <div className="add-review mt-4">
                <textarea
                  className="form-control mb-3"
                  placeholder="Escribe tu reseña..."
                  value={newReview.comment}
                  onChange={handleCommentChange}
                ></textarea>
                <div className="rating-input mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => handleRatingChange(star)}
                    >
                      {star <= newReview.rating ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
                <button className="btn btn-primary" onClick={handleAddReview}>
                  Publicar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
