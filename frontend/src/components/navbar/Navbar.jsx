import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

const navigate = useNavigate();
const { isAuth, logout } = useAuth();

const handleLogout = () => {
    Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Se cerrará tu sesión actual",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar",
    cancelButtonText: "Cancelar"
    }).then((result) => {
    if (result.isConfirmed) {
        logout();
        navigate("/login");
    }
    });
};

return (
    <nav className="navbar">

    <div className="navbar-logo">
        <img src="/img/favicon.ico" alt="logo" />
    </div>

    <ul className="navbar-links">

        <li><Link to="/">Inicio</Link></li>

        {isAuth && (
        <>
            <li><Link to="/espacios">Espacios</Link></li>
            <li><Link to="/movimientos">Movimientos</Link></li>
            <li><Link to="/metas">Metas</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
            <li><Link to="/configuracion">Configuración</Link></li>
        </>
        )}

        {!isAuth && (
        <>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login" className="login-btn">Login</Link></li>
        </>
        )}

        {isAuth && (
        <li>
            <button onClick={handleLogout}>
            Cerrar sesión
            </button>
        </li>
        )}

    </ul>

    </nav>
);
};

export default Navbar;