import React, {useEffect, useState} from "react";
import {fetchAPI} from "../../utils/api.js";
import SpaceCard from "./SpaceCard";
import "./Espacios.css";

const Espacios = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] =  useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "individual",
    targetAmount: "",
    currency: "$",
    color: "#4CAF50"
  });

  const getSpaces = async () => {
    try{
      setLoading(true);
      const {data} = await fetchAPI("/spaces");
      setSpaces(data);
    }catch(error){
      console.error("Error cargando espacios:",error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try{
      await fetchAPI("/spaces", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          targetAmount: Number(form.targetAmount)
        })
      });

      setForm({
        name: "",
        type: "individual",
        targetAmount: "",
        currency: "$",
        color: "#4CAF50"
      });

      setShowModal(false);

      getSpaces();
    }catch(error){
      console.error(error);
      alert("Error al crear espacio");
    }
  };

  const filteredSpaces = spaces.filter(space => {
    if(filter === "all") return true;
    return space.type === filter;
  });

  const stats = {
    totalSpaces: spaces.length,
    totalSaved: spaces.reduce((acc, s) => acc + Number(s.currentAmount), 0),
    totalTarget: spaces.reduce((acc, s) => acc + Number(s.targetAmount), 0)
  };

  if(loading){
      return <p style={{color: "white"}}>Cargando espacios...</p>;
  }

  return(
    <div className="espacios-container">
      <div className="top-section">
        <div className="header-info">
          <h1>Espacios</h1>
          <p>Gestiona tus metas de ahorro</p>
        </div>

        <button className="create-space-btn"
        onClick={() => {
          console.log("Click funcionando")
          setShowModal(true)}}>
          + Crear espacio
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>{stats.totalSpaces}</h3>
          <p>Espacios</p>
        </div>

        <div className="stat-card">
          <h3>${stats.totalSaved.toLocaleString()}</h3>
          <p>Ahorrado</p>
        </div>

        <div className="stat-card">
          <h3>${stats.totalTarget.toLocaleString()}</h3>
          <p>Meta</p>
        </div>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}>
          Todos
        </button>

        <button onClick={() => setFilter("individual")}
          className={filter === "individual" ? "active": ""}>
          Individual
        </button>

        <button onClick={() => setFilter("shared")}
          className= {filter === "shared" ? "active": ""}>
          Compartido
        </button>
      </div>

      <div className="spaces-grid">
        {filteredSpaces.map(space =>(
          <SpaceCard 
          key={space.id}
          space={space}
          onDeleted={getSpaces}
          />
        ))}
        </div>

        {filteredSpaces.length === 0 &&(
          <p>No hay espacios</p>
        )}

      {showModal &&(
        <div className="modal">
          <div className="modal-content">
            <h3>Crear espacio</h3>
            <form onSubmit={handleCreate}>

              <input 
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required/>

              <select
              name="type"
              value={form.type}
              onChange={handleChange}
              >
                <option value="individual">Individual</option>
                <option value="shared">Compartido</option>
              </select>

              <input
              type="number"
              name="targetAmount"
              placeholder="Meta"
              value={form.targetAmount}
              onChange={handleChange}
              required
              />

              <input
              type="text"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              />

              <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              />

              <div style={{marginTop: "10px"}}>
                <button type="submit">
                  Crear
                </button>
                <button
                type="button"
                onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Espacios;