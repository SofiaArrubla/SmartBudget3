// Inicio.jsx - Página principal
// Se renderiza cuando la URL es "/"

import React from "react";
import "./Inicio.css";

const Inicio = () => {
    return (
        <main className="inicio">

            {/* HERO */}
            <section className="hero">
                <h1>Bienvenido a Nuestro Sitio</h1>
                <p>
                    Creamos soluciones tecnológicas modernas para empresas y emprendedores.
                </p>
                <button>Conocer más</button>
            </section>

            {/* SECCIÓN DE SERVICIOS */}
            <section className="servicios">

                <h2>Nuestros Servicios</h2>

                <div className="servicios-container">

                    <div className="card">
                        <h3>Desarrollo Web</h3>
                        <p>Construimos sitios web modernos y responsivos.</p>
                    </div>

                    <div className="card">
                        <h3>Aplicaciones Backend</h3>
                        <p>Desarrollamos servidores y APIs con Node.js.</p>
                    </div>

                    <div className="card">
                        <h3>Bases de Datos</h3>
                        <p>Diseño y gestión de bases de datos eficientes.</p>
                    </div>

                </div>

            </section>

            {/* LLAMADA A LA ACCIÓN */}
            <section className="cta">

                <h2>¿Tienes un proyecto en mente?</h2>
                <p>Contáctanos y te ayudaremos a hacerlo realidad.</p>

                <button>Contactar</button>

            </section>

        </main>
    );
};

export default Inicio;