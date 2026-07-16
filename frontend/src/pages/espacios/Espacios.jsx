import React, {useEffect, useState, useMemo} from "react";
import {fetchAPI} from "../../utils/api.js";
import SpaceCard from "./SpaceCard";
import Swal from "sweetalert2";
import "./Espacios.css";

const Espacios = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] =  useState(true);
  const [creating, setCreating] = useState(false);
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
      Swal.fire(
        "error",
        "No se pudieron cargar los espacios",
        "error"
      );
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  useEffect(() => {
    const handlekeyDown = (e) => {
      if(e.key === "Escape") setShowModal(false);
    };
    if(showModal){
      window.addEventListener("keydown", handlekeyDown);
    }
    return () => window.removeEventListener("keydown", handlekeyDown);
  }, [showModal]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const amount = Number(form.targetAmount);

    if(!form.name.trim()){
      Swal.fire("Nombre inválido", "El espacio de ahorro necesita un nombre", "warning");
      return;
    }

    if(isNaN(amount) || amount <= 0){
      Swal.fire("Monto inválido", "La meta de ahorro debe ser un número mayor a 0", "warning");
      return;
    }

    try{
      setCreating(true);
      await fetchAPI("/spaces", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          targetAmount: amount
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

      await Swal.fire({
        title: "Exito",
        text: "Espacio creado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      getSpaces();
    }catch(error){
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo crear el espacio de ahorro",
        icon: "error"
      });
    }finally{
      setCreating(false);
    }
  };

  const filteredSpaces = useMemo (() =>{
    return spaces.filter(space => {
      if (filter === "all") return true;
      return space.type === filter;
    });
  }, [spaces, filter]);

  const stats = useMemo (() =>({
    totalSpaces: spaces.length,
    totalSaved: spaces.reduce((acc, s) => acc + Number(s.currentAmount || 0), 0),
    totalTarget: spaces.reduce((acc, s) => acc + Number(s.targetAmount || 0), 0)
  }), [spaces]);

  if(loading){
      return (
        <div className="espacios-container">
          <p style={{color: "white", textAlign: "center", marginTop: "40px"}}>Cargando tus metas...</p>
        </div>
      );
  }

  return(
    <div className="espacios-container">
      <div className="top-section">
        <div className="header-info">
          <h1>Metas</h1>
          <p>Gestiona tus metas de ahorro</p>
        </div>

        <button className="create-space-btn" onClick={() => setShowModal(true)}> 
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
          <p>Meta total</p>
        </div>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          Todos
        </button>

        <button onClick={() => setFilter("individual")} className={filter === "individual" ? "active": ""}>
          Individual
        </button>

        <button onClick={() => setFilter("shared")} className= {filter === "shared" ? "active": ""}>
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
          <p style={{textAlign: "center", marginTop: "40px", color: "#aaa"}}>
            No se encontraron espacios en esta categoria
          </p>
        )}

      {showModal &&(
        <div className="modal" onClick={(e) => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Nuevo Espacio</h3>
            <form onSubmit={handleCreate}>

              <label>Nombre del espacio</label>
              <input 
              type="text"
              name="name"
              placeholder="Ej: Viaje a la playa"
              value={form.name}
              onChange={handleChange}
              maxLength={40}
              required
              />

              <label>Tipo de ahorro</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="individual">Individual</option>
                <option value="shared">Compartido</option>
              </select>

              <label>Meta de ahorro</label>
              <input
              type="number"
              name="targetAmount"
              placeholder="Monto de la meta"
              value={form.targetAmount}
              onChange={handleChange}
              min="1"
              required
              />

              <label>Color de la tarjeta</label>
              <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              style={{height: '40px', padding: '2px', cursor: 'pointer'}}
              />

              <div className="modal-actions" style={{marginTop: "20px", display: 'flex', gap: '10px'}}>
                <button className="create-space-btn" style={{flex: 1}} type="submit" disabled={creating}>
                  {creating ? "Creando..." : "Crear"}
                </button>
                <button style={{flex: 1, background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
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