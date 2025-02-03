import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export const Register = () => {
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
          <h2 className="mt-4 mb-3">Registrar</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="name"
                id="name"
                className="form-control"
                placeholder="Digita tu nombre"
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="recoverPassword" className="form-label">
                Confirmar contraseña
              </label>
              <input
                type="recoverPassword"
                id="recoverPassword"
                className="form-control"
                placeholder="**********"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              INGRESAR
            </button>
          </form>
          <p className="text-center mt-4">
            ¿Ya tienes tu cuenta?{" "}
            <Link to="/" className="text-decoration-none text-danger">
              Inicia Sesión
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
