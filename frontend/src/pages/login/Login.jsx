import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">

      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Bienvenido a SmartBudget</p>

        <form className="login-form">
          
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Ingresa tu correo" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </div>

          <button className="login-btn">Entrar</button>

        </form>

      </div>

    </div>
  );
};

export default Login;