import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMenu.css"; // Archivo CSS para estilos personalizados

export const CreateMenu = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([
    { name: "", price: "", image: null, description: "" },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDishes = [...dishes];
    updatedDishes[index][name] = value;
    setDishes(updatedDishes);
  };

  const handleFileChange = (index, event) => {
    const updatedDishes = [...dishes];
    updatedDishes[index].image = event.target.files[0];
    setDishes(updatedDishes);
  };

  const addDish = () => {
    setDishes([...dishes, { name: "", price: "", image: null, description: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del menú
    console.log("Menú enviado:", dishes);
    alert("Menú enviado correctamente.");
    navigate("/home");
  };

  return (
    <div className="menu-container shadow-lg rounded-4 p-4 bg-white">
      <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        Regresar
      </button>
      <div className="text-center">
        <img
          src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
          alt="FoodFinder Logo"
          style={{ width: "200px" }}
        />
      </div>
      <h2 className="text-center mb-4">Crear restaurante</h2>
      <h3 className="text-center">Menú</h3>
      <form onSubmit={handleSubmit}>
        {dishes.map((dish, index) => (
          <div key={index} className="dish-card p-3 mb-4">
            <div className="mb-3">
              <label className="form-label">Nombre del platillo</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={dish.name}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Ejemplo: Arroz con pollo"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio (₡)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={dish.price}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Ejemplo: 2500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {dish.image && (
                  <img
                    src={URL.createObjectURL(dish.image)}
                    alt="Dish Preview"
                    className="preview-img ms-2"
                  />
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="description"
                value={dish.description}
                onChange={(e) => handleInputChange(index, e)}
                rows="2"
                placeholder="Breve descripción del platillo"
              ></textarea>
            </div>
            <hr />
          </div>
        ))}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-add-dish"
            onClick={addDish}
          >
            +
          </button>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
