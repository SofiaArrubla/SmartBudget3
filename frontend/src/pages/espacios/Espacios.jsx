import React, { useEffect, useState } from "react";
import "./Espacios.css";
import { fetchAPI } from "../../utils/api";

const Espacios = () => {

  const [spaces, setSpaces] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // estado para mostrar usuarios compartidos (IMPORTANTE: fuera del map)
  const [openShared, setOpenShared] = useState({});

  // 🔥 traer datos del backend
  useEffect(() => {
    const getSpaces = async () => {
      try {
        const { data } = await fetchAPI("/spaces");

        // normalizar datos del backend
        const normalized = data.map(space => ({
          ...space,
          targetAmount: Number(space.target_amount),
          currentAmount: Number(space.current_amount),
          createdAt: space.created_at
        }));

        setSpaces(normalized);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSpaces();
  }, []);

  // 🔥 toggle usuarios compartidos
  const toggleShared = (id) => {
    setOpenShared(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 🔥 filtros
  const filteredSpaces = spaces.filter(space => {
    if (filter === "all") return true;
    return space.type === filter;
  });

  // 🔥 stats
  const stats = {
    totalSpaces: spaces.length,
    totalSaved: spaces.reduce((acc, s) => acc + s.currentAmount, 0),
    totalTarget: spaces.reduce((acc, s) => acc + s.targetAmount, 0)
  };

  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <div className="espacios-container">

      {/* HEADER */}
      <div className="espacios-header">
        <div>
          <h1>Mis Espacios de Ahorro</h1>
          <p>Organiza tus metas financieras</p>
        </div>

        <button className="create-space-btn">
          + Crear nuevo espacio
        </button>
      </div>

      {/* STATS */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{stats.totalSpaces}</h3>
            <p>Espacios activos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏦</div>
          <div className="stat-info">
            <h3>${stats.totalSaved.toLocaleString()}</h3>
            <p>Total ahorrado</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>${stats.totalTarget.toLocaleString()}</h3>
            <p>Meta total</p>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todos ({spaces.length})
        </button>

        <button 
          className={`filter-tab ${filter === "individual" ? "active" : ""}`}
          onClick={() => setFilter("individual")}
        >
          Individuales ({spaces.filter(s => s.type === "individual").length})
        </button>

        <button 
          className={`filter-tab ${filter === "shared" ? "active" : ""}`}
          onClick={() => setFilter("shared")}
        >
          Compartidos ({spaces.filter(s => s.type === "shared").length})
        </button>
      </div>

      {/* CARDS */}
      <div className="spaces-grid">
        {filteredSpaces.map(space => {

          const progress = (space.currentAmount / space.targetAmount) * 100;
          const remaining = space.targetAmount - space.currentAmount;

          return (
            <div key={space.id} className="space-card" style={{ borderTopColor: space.color }}>

              <div className="card-header">
                <div className="card-title">
                  <h3>{space.name}</h3>
                  <span className={`space-type ${space.type}`}>
                    {space.type === "individual" ? "Individual" : "Compartido"}
                  </span>
                </div>
              </div>

              <div className="card-content">

                {/* MONTOS */}
                <div className="amount-section">
                  <div className="current-amount">
                    <label>Monto actual</label>
                    <span className="amount-value">
                      {space.currency}{space.currentAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="target-amount">
                    <label>Meta</label>
                    <span>
                      {space.currency}{space.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* PROGRESO */}
                <div className="progress-section">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: space.color }}
                    />
                  </div>

                  <div className="progress-stats">
                    <span>{progress.toFixed(1)}%</span>
                    <span>Faltan {space.currency}{remaining.toLocaleString()}</span>
                  </div>
                </div>

                {/* COMPARTIDOS */}
                {space.type === "shared" && (
                  <div className="shared-section">
                    <button 
                      className="shared-toggle"
                      onClick={() => toggleShared(space.id)}
                    >
                      Ver participantes
                    </button>

                    {openShared[space.id] && (
                      <div className="shared-users-list">
                        <p>No implementado aún</p>
                      </div>
                    )}
                  </div>
                )}

              </div>

              <div className="card-footer">
                📅 {new Date(space.createdAt).toLocaleDateString()}
              </div>

            </div>
          );
        })}
      </div>

      {/* VACÍO */}
      {filteredSpaces.length === 0 && (
        <div className="empty-state">
          <h3>No hay espacios</h3>
          <p>Crea tu primer espacio</p>
        </div>
      )}

    </div>
  );
};

export default Espacios;