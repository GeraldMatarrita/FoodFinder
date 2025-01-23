import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Aquí iría tu lógica de autenticación (por ejemplo, una llamada a una API)
    const isAuthenticated = true;
    // await authenticateUser(); // Simula la autenticación

    if (isAuthenticated) {
      navigate('/home'); // Redirige al Home si la autenticación es exitosa
    } else {
      alert('Credenciales incorrectas'); // Muestra un mensaje de error
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg rounded-4 p-4 bg-white">
        {/* Columna para el formulario */}
        <div className="col-md-6 p-4">
          <img
            src={require("../../assets/foodFinderLogos/FoodFinder texto derecha.png")}
            alt="FoodFinder Logo"
            className="logo"
          />
          <p className="text-center text-muted">
            Encuentra lo que deseas cerca de ti
          </p>
          <h2 className="mt-4 mb-3">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Digita tu correo electrónico"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="**********"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              INGRESAR
            </button>
          </form>
          <p className="text-center mt-4">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/register" className="text-decoration-none text-danger">
              Crea tu cuenta
            </Link>
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={require("../../assets/images/comida.png")}
            alt="Heart Food Icons"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};
