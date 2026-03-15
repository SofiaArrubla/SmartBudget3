import React from "react";
import { Link } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Crear Cuenta</h2>
        <p className="register-subtitle">
          Regístrate para comenzar a usar SmartBudget
        </p>

        <form className="register-form">

          <div className="input-group">
            <label>Nombre</label>
            <input type="text" placeholder="Ingresa tu nombre" required />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Crea una contraseña" required />
          </div>

          <button className="register-btn">
            Registrarse
          </button>

        </form>

        <p className="login-text">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="login-link">
            Inicia sesión
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Registro;