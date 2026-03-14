import React from "react";
// Link: componente de React Router que reemplaza al <a> tradicional
// Evita recargas de página y mantiene el historial del navegador
import { Link } from "react-router-dom";
import "./Navbar.css";



const Navbar = () => {
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
                <li><Link to="/configuracion">Configuracion</Link></li>
                <li><Link to="/espacios">Espacios</Link></li>
                <li><Link to="/metas">Metas</Link></li>
                <li><Link to="/movimientos">Movimientos</Link></li>
                <li><Link to="/registro">Registro</Link></li>
                <li><Link to="/reportes">Reportes</Link></li>
                <li>
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                </li>
            </ul>

            </nav>
            
        
    );
};

export default Navbar;