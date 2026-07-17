import React, { useState, useEffect, useMemo } from "react";
import { Wallet, CreditCard, TrendingUp } from "lucide-react";
import "./Movimientos.css";
import CreateMovementModal from "../movimientos/CreateMovementModal";
import { fetchAPI } from "../../utils/api.js";
import Swal from "sweetalert2";

const Movimientos = () => {
  const [showModal, setShowModal] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMovement, setEditingMovement] = useState(null);

  const getMovimientos = async () => {
    try {
      setLoading(true);
      const { data } = await fetchAPI("/movements");
      setMovimientos(data || []);
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron obtener tus transacciones de este mes.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovimientos();
  }, []);

  const totales = useMemo(() => {
    const ingresos = movimientos
      .filter((m) => m.type === "ingreso" || m.type === "income")
      .reduce((sum, m) => sum + Number(m.amount || 0), 0);

    const gastos = movimientos
      .filter((m) => m.type === "gasto" || m.type === "expense")
      .reduce((sum, m) => sum + Number(m.amount || 0), 0);

    return {
      ingresos,
      gastos,
      balance: ingresos - gastos,
    };
  }, [movimientos]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSuccess = () => {
    setShowModal(false);
    setEditingMovement(null);
    getMovimientos();
  };

  const handleEdit = (movimiento) => {
    setEditingMovement(movimiento);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer y afectará tu balance global.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetchAPI(`/movements/${id}`, {
            method: "DELETE"
          });
          
          Swal.fire({
            title: "Eliminado",
            text: "El movimiento ha sido borrado con éxito.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          
          getMovimientos();
        } catch (error) {
          console.error("Error al borrar:", error);
          Swal.fire({
            title: "Error",
            text: error.message || "No se pudo eliminar el registro",
            icon: "error"
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container">
        <p style={{ color: "white", textAlign: "center", marginTop: "40px" }}>
          Sincronizando tus finanzas...
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main">
        <header className="header">
          <h3>Movimientos</h3>
          <button 
            className="btn" 
            onClick={() => {
              setEditingMovement(null);
              setShowModal(true);
            }}
          >
            + Nuevo movimiento
          </button>
        </header>

        <div className="cards">
          <div className="card ingreso">
            <div className="card-icon">
              <Wallet size={28} />
            </div>
            <p>Ingresos del mes</p>
            <h2>{formatCurrency(totales.ingresos)}</h2>
          </div>

          <div className="card gastos">
            <div className="card-icon">
              <CreditCard size={28} />
            </div>
            <p>Gastos del mes</p>
            <h2>{formatCurrency(totales.gastos)}</h2>
          </div>

          <div className="card balance">
            <div className="card-icon">
              <TrendingUp size={28} />
            </div>
            <p>Balance del mes</p>
            <h2 style={{ color: totales.balance < 0 ? "#ff4d4d" : "inherit" }}>
              {formatCurrency(totales.balance)}
            </h2>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Método</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-message">
                  No hay movimientos registrados
                </td>
              </tr>
            ) : (
              movimientos.map((movimiento) => (
                <tr key={movimiento.id}>
                  <td
                    className={
                      movimiento.type === "ingreso" || movimiento.type === "income"
                        ? "ingreso-text"
                        : "gasto-text"
                    }
                  >
                    {movimiento.type === "ingreso" || movimiento.type === "income" ? "Ingreso" : "Gasto"}
                  </td>
                  <td>{formatCurrency(movimiento.amount)}</td>
                  <td>{movimiento.category}</td>
                  <td>{movimiento.paymentMethod || movimiento.payment_method || "No especificado"}</td>
                  <td>
                    {movimiento.date 
                      ? new Date(movimiento.date).toLocaleDateString("es-CO") 
                      : movimiento.created_at 
                      ? new Date(movimiento.created_at).toLocaleDateString("es-CO") 
                      : "S/F"
                    }
                  </td>
                  <td>{movimiento.description || "Sin descripción"}</td>
                  <td>
                    <div className="action-buttons" style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(movimiento)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(movimiento.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showModal && (
          <CreateMovementModal
            onClose={() => {
              setShowModal(false);
              setEditingMovement(null);
            }}
            onSuccess={handleSuccess}
            editingMovement={editingMovement}
          />
        )}
      </main>
    </div>
  );
};

export default Movimientos;