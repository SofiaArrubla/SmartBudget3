import React, {useState,useEffect} from "react";
// Link: componente de React Router que reemplaza al <a> tradicional
// Evita recargas de página y mantiene el historial del navegador
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {

    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    //Detecta si hay Token
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    //Cerrar sesión (Eliminar token)
    const logout = () => {
    Swal.fire({
        title: "¿Cerrar sesión?",
        text: "Se cerrará tu sesión actual",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem("token");
            setIsAuth(false);
            navigate("/login");
        }
    });
};

    return (
        <nav className="navbar">
            {/* Logo que también sirve como enlace a la página de inicio */}
            <div className="navbar-logo">
                {/* Link "to" recibe la ruta definida en App.jsx */}
                <img src="/img/favicon.ico" alt="" />
            </div>

            <ul className="navbar-links">
                {/* Cada <Link to="..."> corresponde a un <Route path="..."> en App.jsx */}
                <li><Link to="/">Inicio</Link></li>

                {isAuth &&(
                    <>
                    <li><Link to="/espacios">Espacios</Link></li>
                    <li><Link to="/movimientos">Movimientos</Link></li>
                    <li><Link to="/metas">Metas</Link></li>
                    <li><Link to="/reportes">Reportes</Link></li>
                    <li><Link to="/configuracion">Configuracion</Link></li>
                    </>
                )}

                {!isAuth &&(
                    <>
                    <li><Link to="/registro">Registro</Link></li>
                    <li><Link to="/login" className="login-btn">Login</Link></li>
                    </>
                )}
                {isAuth &&(
                <li>
                    <button onClick={logout}>Cerrar sesión</button>
                </li>
                )}
                
            </ul>

            </nav>
            
        
    );
};

export default Navbar;