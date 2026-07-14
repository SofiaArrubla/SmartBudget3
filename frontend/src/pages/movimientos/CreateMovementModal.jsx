import React, { useState } from "react";
import "./CreateMovementModal.css";

const CreateMovementModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    type: "gasto",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.amount || form.amount <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    if (!form.category) {
      alert("Por favor selecciona una categoría");
      return;
    }

    if (!form.paymentMethod) {
      alert("Por favor selecciona un método de pago");
      return;
    }

    if (!form.date) {
      alert("Por favor selecciona una fecha");
      return;
    }

    // Crear el movimiento
    onCreated({
      ...form,
      amount: Number(form.amount),
    });

    // Resetear formulario (opcional)
    setForm({
      type: "gasto",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nuevo movimiento</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-select"
            >
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>

          <div className="form-group">
            <input
              name="amount"
              type="number"
              placeholder="Monto"
              value={form.amount}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Categoría</option>
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Salud">Salud</option>
              <option value="Ocio">Ocio</option>
              <option value="Salario">Salario</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Método de pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Nequi">Nequi</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              className="form-textarea"
              rows="2"
            />
          </div>

          <div className="buttons">
            <button type="submit" className="btn-save">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovementModal;