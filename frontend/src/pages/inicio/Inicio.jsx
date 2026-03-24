// Inicio.jsx - Página principal
// Se renderiza cuando la URL es "/"

import React from "react";
import "./Inicio.css";
import { fetchAPI } from "../../utils/api";

const Inicio = () => {

  const obtenerPerfil = async () => {
  const token = localStorage.getItem("token");

  try{
    const data = await fetchAPI("/profile");
    console.log(data);
  }catch(error){
    console.log(error)
  }

  };

  return (
    <div className="inicio">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1><br /><span className="highlight">Toma el control de tus finanzas</span></h1>
          <p>SmartBudget is your personal financial diary. Track expenses, set goals, and manage your money intelligently - whether personal or shared.</p>
          <button className="cta-button">Comenzar</button>
        </div>

      </section>

      <section className="features">
        <h2>Qué ofrecemos?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Control de gastos</h3>
            <p>Registra todos tus ingresos y gastos para tener un control claro de tu dinero en todo momento.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Metas financieras</h3>
            <p>Define objetivos de ahorro y haz seguimiento a tu progreso paso a paso.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Presupuestos compartidos</h3>
            <p>Gestiona gastos en conjunto con otras personas de forma organizada.</p>
          </div>
        </div>
      </section>

      <section className="personalization">
        <div className="personalization-content">
          <h2> <span className="highlight">Gestiona tus espacios compartidos</span></h2>
          <p>Administra gastos con amigos, familia o compañeros.
          Mantén todo organizado y transparente en un solo lugar.</p>
          <button className="secondary-button">Crear espacio</button>
        </div>
         <div className="shared-card">

        <div className="card-header">
          <span>Viaje a Cartagena</span>
          <span className="members">👥 3</span>
        </div>

        <div className="card-body">
          <p>Gasto total</p>
          <h3>$850</h3>
        </div>

        <div className="card-users">
          <span>Juan</span>
          <span>Ana</span>
          <span>Tú</span>
        </div>

      </div>

      </section>

      

    </div>
  );
};
export default Inicio;