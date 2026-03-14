// Inicio.jsx - Página principal
// Se renderiza cuando la URL es "/"

import React from "react";
import "./Inicio.css";


const Inicio = () => {
  return (
    <div className="inicio">

      {/* HERO */}
      <section className="hero">
        <h1>Controla tus finanzas fácilmente</h1>
        <p>
          SmartBudget te ayuda a organizar tus gastos, metas y movimientos
          para que tengas un mejor control de tu dinero.
        </p>

        <button className="hero-btn">Comenzar</button>
      </section>

      {/* CARDS */}
      <section className="features">

        <div className="card">
          <h3>📊 Control de gastos</h3>
          <p>Registra y visualiza todos tus movimientos financieros.</p>
        </div>

        <div className="card">
          <h3>🎯 Metas financieras</h3>
          <p>Establece objetivos y monitorea tu progreso.</p>
        </div>

        <div className="card">
          <h3>📈 Reportes</h3>
          <p>Analiza tus finanzas con estadísticas claras.</p>
        </div>

      </section>

    </div>
  );
};

export default Inicio;