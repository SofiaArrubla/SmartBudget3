import { useState } from "react";
import { Link, } from "react-router-dom";
import "./Registro.css";
import { fetchAPI } from "../../utils/api";
import swal from "sweetalert2";

function Registro(){
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault();

    if(!nombre){
      swal.fire({
        title: "Nombre invalido",
        text: "El campo de Nombre no debe de estar vacios",
        icon: "warning"
      });
      return;
    }

    if(!email){
      swal.fire({
        title: "Correo invalido",
        text: "El campo de Correo no debe de estar vacio",
        icon: "warning"
      });
      return;
    }

    if(!password){
      swal.fire({
        title: "Contraseña invalida",
        text: "El campo de Contraseña no debe de estar vacio",
        icon: "warning"
      });
      return;
    }

    if(!email.includes("@")){
      swal.fire({
        title: "Email inválido",
        text: "Ingresar un correo válido",
        icon: "warning"
      });
      return;
    }

    if(password.length < 6){
      swal.fire({
        title: "Contraseña debil",
        text: "Debe tener minimo 6 caracteres",
        icon: "warning"
      });
      return;
    }

    try{
      const {data} = await fetchAPI("/register", {
        method: "POST",
        body: JSON.stringify({nombre, email, password})
      });

      swal.fire({
        title: "Registro exitoso",
        text: data.message,
        icon: "success"
      });

      setNombre("");
      setEmail("");
      setPassword("");

    }catch(error){
    swal.fire({
      title: "Error",
      text: error.message,
      icon: "error"
    });
  }
};

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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input 
            type="email" 
            placeholder="Ingresa tu correo" 
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
            type="password" 
            placeholder="Crea una contraseña" 
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            />
          </div>

          <button className="register-btn" type="submit">
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