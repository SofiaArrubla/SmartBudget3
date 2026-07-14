import React, { useState, useEffect } from "react";
import { Wallet, CreditCard, TrendingUp } from "lucide-react";
import "./Movimientos.css";
import CreateMovementModal from "../movimientos/CreateMovementModal";

const Movimientos = () => {
  const [showModal, setShowModal] = useState(false);
  const [movimientos, setMovimientos] = useState([ //ejenplos de movimientos
    {
      id: 1,
      type: "gasto",
      amount: 0,
      category: "Comida",
      paymentMethod: "Efectivo",
      date: "2023-10-01",
      description: "Compra en el supermercado",
    },
    {
      id: 2,
      type: "ingreso",
      amount: 0,
      category: "Salario",
      paymentMethod: "Transferencia",
      date: "2023-10-01",
      description: "Nómina",
    },
  ]);

  const [totales, setTotales] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0,
  });

  // Calcular totales cada vez que cambien los movimientos
  useEffect(() => {
    const ingresos = movimientos
      .filter((m) => m.type === "ingreso")
      .reduce((sum, m) => sum + m.amount, 0);

    const gastos = movimientos
      .filter((m) => m.type === "gasto")
      .reduce((sum, m) => sum + m.amount, 0);

    setTotales({
      ingresos,
      gastos,
      balance: ingresos - gastos,
    });
  }, [movimientos]);

  // Formatear número a moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Crear nuevo movimiento
  const handleCreateMovement = (newMovement) => {
    const movementWithId = {
      ...newMovement,
      id: Date.now(), // ID único basado en timestamp
      amount: Number(newMovement.amount),
    };
    setMovimientos([movementWithId, ...movimientos]);
  };

  // Editar movimiento
  const handleEdit = (id) => {
    const movimiento = movimientos.find((m) => m.id === id);
    if (movimiento) {
      // Formulario de edición, solo se muestra un alert por ahora
      console.log("Editar movimiento:", movimiento);
      alert(`Editando movimiento: ${movimiento.description}`);
    }
  };

  // Borrar movimiento
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este movimiento?")) {
      setMovimientos(movimientos.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="container">
      <main className="main">
        <header className="header">
          <h3>Movimientos</h3>
          <button className="btn" onClick={() => setShowModal(true)}>
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
            <h2>{formatCurrency(totales.balance)}</h2>
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
              <th></th>
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
                      movimiento.type === "ingreso"
                        ? "ingreso-text"
                        : "gasto-text"
                    }
                  >
                    {movimiento.type === "ingreso" ? "Ingreso" : "Gasto"}
                  </td>
                  <td>{formatCurrency(movimiento.amount)}</td>
                  <td>{movimiento.category}</td>
                  <td>{movimiento.paymentMethod}</td>
                  <td>{movimiento.date}</td>
                  <td>{movimiento.description}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(movimiento.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(movimiento.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* MODAL */}
        {showModal && (
          <CreateMovementModal
            onClose={() => setShowModal(false)}
            onCreated={handleCreateMovement}
          />
        )}
      </main>
    </div>
  );
};

export default Movimientos;