import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Context API
  const { login } = useAuth();

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if(!email || !password){
      Swal.fire({
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios",
        icon: "warning"
      });
      return;
    }

    if(!email.includes("@")){
      Swal.fire({
        title: "Email invalido",
        text: "Ingresa un correo válido",
        icon: "warning"
      });
      return;
    }

    try {
      setLoading(true);

      // petición centralizada
      const {data} = await fetchAPI("/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      // guardar sesión correctamente
      login(data.token, data.user);

      // feedback UX
      Swal.fire({
        title: "Bienvenido",
        text: data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }finally{
      setLoading(false);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button className="login-btn" disabled={loading}>
            {loading ? "cargando..." : "entrar"}
            </button>

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