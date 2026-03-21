import { useState } from "react";
import { Link } from "react-router-dom";
import "./Registro.css";
import { fetchAPI } from "../../utils/api";
import swal from "sweetalert2";

function Registro(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try{

      const data = await fetchAPI("/register", {
        method: "POST",
        body: JSON.stringify({email, password})
      });

      swal.fire({
        title: "Registro exitoso",
        text: data.message,
        icon: "success"
      });
    }catch(error){
    swal.fire({
      title: "Error",
      text: error.message,
      icon: "error"
    });
  }
}

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Crear Cuenta</h2>
        <p className="register-subtitle">
          Regístrate para comenzar a usar SmartBudget
        </p>

        <form className="register-form" onSubmit={registrarUsuario}>

          <div className="input-group">
            <label>Nombre</label>
            <input 
            type="text" 
            placeholder="Ingresa tu nombre"  
            required />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input 
            type="email" 
            placeholder="Ingresa tu correo" 
            onChange={(e) =>setEmail(e.target.value)}
            required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
            type="password" 
            placeholder="Crea una contraseña" 
            onChange={(e) =>setPassword(e.target.value)}
            required />
          </div>

          <button className="register-btn"
          type="submit"
          >
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
}

export default Registro;