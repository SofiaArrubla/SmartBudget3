import React, { useState, useEffect } from "react";
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
  const { login, isAuth } = useAuth();

  // Si ya está autenticado, se envia al inicio
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        title: "Email inválido",
        text: "El campo de Correo no debe estar vacío",
        icon: "warning"
      });
      return;
    }

    if (!password) {
      Swal.fire({
        title: "Contraseña inválida",
        text: "El campo de Contraseña no debe estar vacío",
        icon: "warning"
      });
      return;
    }

    if (!email.includes("@")) {
      Swal.fire({
        title: "Email inválido",
        text: "Ingresa un correo válido",
        icon: "warning"
      });
      return;
    }

    try {
      setLoading(true);

      // Petición centralizada
      const response = await fetchAPI("/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password })
      });

      // Validamos de forma segura que la respuesta y la propiedad 'data' existan
      if (!response || !response.data) {
        throw new Error("No se recibió una respuesta válida del servidor.");
      }

      const { data } = response;

      // Validamos que el token exista en la respuesta antes de guardarlo
      if (!data.token) {
        throw new Error(data.message || "No se recibió un token de acceso válido.");
      }

      // Guardar sesión correctamente
      login(data.token, data.user);

      // Feedback UX
      Swal.fire({
        title: "Bienvenido",
        text: data.message || "¡Sesión iniciada con éxito!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Error capturado en Login:", error);
      
      // Si el error viene de fetchAPI, tendrá la estructura { status, message }
      // Si es un error común, usará error.message
      const mensajeError = error.message || "Credenciales incorrectas o error en el servidor";

      Swal.fire({
        title: "Error de autenticación",
        text: mensajeError,
        icon: "error",
      });
    } finally {
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

          <button className="login-btn" type="submit" disabled={loading}>
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