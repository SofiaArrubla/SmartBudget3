import React, {useEffect, useState, useMemo} from "react";
import {fetchAPI} from "../../utils/api.js";
import SpaceCard from "./SpaceCard";
import Swal from "sweetalert2";
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
      Swal.fire(
        "Error", error.message || "No se pudo crear el espacio", "error"
      );
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
          <p style={{color: "white", textAlign: "center"}}>Cargando tus metas...</p>
        </div>
      );
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
          <p style={{textAlign: "center", marginTop: "20px", color: "#aaa"}}>
            No se encontraron espacios en esta categoria
          </p>
        )}

      {showModal &&(
        <div className="modal">
          <div className="modal-content">
            <h3>Nuevo Espacio</h3>
            <form onSubmit={handleCreate}>

              <label>Nombre del espacio</label>
              <input 
              type="text"
              name="name"
              placeholder="Ej: Viaje a la playa"
              value={form.name}
              onChange={handleChange}
              required/>

              <label>Tipo de ahorro</label>
              <select
              name="type"
              value={form.type}
              onChange={handleChange}
              >
                <option value="individual">Individual</option>
                <option value="shared">Compartido</option>
              </select>

              <label>Meta de ahorro</label>
              <input
              type="number"
              name="targetAmount"
              placeholder="Monto meta"
              value={form.targetAmount}
              onChange={handleChange}
              required
              />

              <label>Color de la tarjeta</label>
              <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              style={{height: '40px', padding: '2px'}}
              />

              <div className="modal-actions" style={{marginTop: "20px", display: 'flex', gap: '10px'}}>
                <button className="create-space-btn" style={{flex: 1}}
                type="submit">
                  Crear
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