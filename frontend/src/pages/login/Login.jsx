import React, {useState} from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email, password})
      });

      const data = await res.json();

      if(res.ok){
        //guarda el token
        localStorage.setItem("token", data.token);

        alert(data.message);

        //Esto redirige después del login
        navigate("/")
      }else{
        alert(data.message);
      }
    }catch(error){
      console.error(error);
      alert("Error al inicar sesión")
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
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
            type="password" 
            placeholder="Ingresa tu contraseña" 
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