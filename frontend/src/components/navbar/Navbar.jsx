import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
const navigate = useNavigate();
const {isAuth, logout, user} = useAuth();
const [open, setOpen] = useState(false);
const menuRef = useRef();

useEffect(() => {
    const handleClickOutside = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)){
            setOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

const handleLogout = () => {
    setOpen(false);
    Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Se cerrará tu sesión actual",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33",
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
        <img src="/Logosmart.png" alt="Logo" />
        <span>SmartBudget</span>
    </div>

    <ul className="navbar-links">
        

        {isAuth && (
        <>
            <li><Link to="/espacios">Metas</Link></li>
            <li><Link to="/movimientos">Movimientos</Link></li>
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
            <div className="nav-user" ref={menuRef}>

                <div className="user-info"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                >
                    <div className="avatar">
                        {user?.email.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span>
                        {user?.email?.split("@")[0] || "Usuario"}
                    </span>
                </div>

                {open &&(
                    <div className="dropdown">
                        <button onClick={() => {setOpen(false); navigate("/configuracion")}}>
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