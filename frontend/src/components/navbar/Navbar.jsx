import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

const navigate = useNavigate();
const { isAuth, logout, user } = useAuth();
const [open, setOpen] = useState(false);
const menuRef = useRef();

useEffect(() => {
    const handleClickOutside = (Event) => {
        if(menuRef.current && !menuRef.current.contains(Event.target)){
            setOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

const handleLogout = () => {
    Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Se cerrará tu sesión actual",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar",
    cancelButtonText: "Cancelar"
    }).then((result) => {
        if(result.isConfirmed){
            logout();
            navigate("/login");
        }
    });
};

return (
    <nav className="navbar">

    <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src="/img/favicon.ico" alt="logo" />
        <span>SmartBudget</span>
    </div>

    <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>

        {isAuth && (
        <>
            <li><Link to="/espacios">Espacios</Link></li>
            <li><Link to="/movimientos">Movimientos</Link></li>
            <li><Link to="/metas">Metas</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
        </>
        )}

        {!isAuth && (
        <>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login" className="login-btn">Login</Link></li>
        </>
        )}

        {isAuth && (
            <div 
            className="nav-user" 
            ref={menuRef}
            >

                <div 
                className="user-info"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                >
                    <div className="avatar">
                        {user?.email.charAt(0).toUpperCase()}
                    </div>

                    <span>
                        {user?.email?.split("@")[0]}
                    </span>
                </div>

                {open &&(
                    <div className="dropdown">
                        <button onClick={() => navigate("/configuracion")}>
                            Configuración
                        </button>

                        <button onClick={handleLogout} className="logout">
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        )}
    </ul>
    </nav>
);
};

export default Navbar;