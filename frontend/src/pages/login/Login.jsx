import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Context API
  const { login } = useAuth();

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try {
      // petición centralizada
      const data = await fetchAPI("/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      // guardar sesión correctamente
      login(data.token);

      // feedback UX
      Swal.fire({
        title: "Bienvenido",
        text: data.message,
        icon: "success",
        confirmButtonText: "Continuar"
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      });
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Bienvenido a SmartBudget</p>

        <form className="login-form" onSubmit={enviarFormulario}>
          
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Ingresa tu correo" 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Recordar contraseña
            </label>

            <Link to="/recuperar" className="forgot">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button className="login-btn">Entrar</button>

        </form>

        <p className="registro-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="registro-link">
            Crea una cuenta
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;