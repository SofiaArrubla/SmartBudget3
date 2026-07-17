import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";
import { fetchAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";

function Registro(){
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {isAuth} = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const registrarUsuario = async (e) => {
    e.preventDefault();

    if(!nombre.trim()){
      swal.fire({
        title: "Nombre invalido",
        text: "El campo de Nombre no debe de estar vacios",
        icon: "warning"
      });
      return;
    }

    if(!email.trim()){
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
      setLoading(true);
      const {data} = await fetchAPI("/register", {
        method: "POST",
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          password
        })
      });

      swal.fire({
        title: "Registro exitoso",
        text: data.message || "Usuario registrado correctamente, ahora puedes iniciar sesión",
        icon: "success"
      });

      setNombre("");
      setEmail("");
      setPassword("");

      navigate("/login");

    }catch(error){
    swal.fire({
      title: "Error",
      text: error.message || "No se pudo registrar la cuenta",
      icon: "error"
    });
    }finally{
      setLoading(false);
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

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
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