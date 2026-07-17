import React, { useState, useEffect } from "react";
import { fetchAPI } from "../../utils/api.js";
import Swal from "sweetalert2";
import "./CreateMovementModal.css";

const CreateMovementModal = ({ onClose, onSuccess, editingMovement }) => {
  const [spaces, setSpaces] = useState([]);
  const [form, setForm] = useState({
    spaceId: "",
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Cargar los espacios disponibles para que el usuario pueda asignar el movimiento
    fetchAPI("/spaces")
      .then(res => setSpaces(res.data || []))
      .catch(err => console.error("Error cargando espacios", err));

    if (editingMovement) {
      setForm({
        spaceId: editingMovement.spaceId || "",
        type: editingMovement.type || "expense",
        amount: editingMovement.amount || "",
        category: editingMovement.category || "",
        description: editingMovement.description || "",
      });
    }
  }, [editingMovement]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.spaceId) {
      return Swal.fire({ icon: "warning", title: "Falta el espacio", text: "Selecciona una meta/espacio." });
    }
    if (!form.amount || Number(form.amount) <= 0) {
      return Swal.fire({ icon: "warning", title: "Monto inválido", text: "Ingresa un monto válido mayor a 0." });
    }
    if (!form.category) {
      return Swal.fire({ icon: "warning", title: "Falta categoría", text: "Selecciona una categoría." });
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        spaceId: Number(form.spaceId),
        amount: Number(form.amount),
      };

      if (editingMovement) {
        await fetchAPI(`/movements/${editingMovement.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        Swal.fire({ icon: "success", title: "¡Actualizado!", text: "Movimiento modificado.", timer: 1500, showConfirmButton: false });
      } else {
        await fetchAPI("/movements", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        Swal.fire({ icon: "success", title: "¡Guardado!", text: "Nuevo movimiento registrado.", timer: 1500, showConfirmButton: false });
      }

      onSuccess();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message || "Error al procesar el movimiento." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingMovement ? "Editar movimiento" : "Nuevo movimiento"}</h2>
          <button className="close-btn" onClick={onClose} disabled={submitting}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select name="spaceId" value={form.spaceId} onChange={handleChange} className="form-select" disabled={submitting || editingMovement}>
              <option value="">Selecciona una Meta / Espacio</option>
              {spaces.map(space => (
                <option key={space.id} value={space.id}>{space.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select name="type" value={form.type} onChange={handleChange} className="form-select" disabled={submitting}>
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </div>

          <div className="form-group">
            <input name="amount" type="number" placeholder="Monto" value={form.amount} onChange={handleChange} className="form-input" step="0.01" min="0" disabled={submitting} />
          </div>

          <div className="form-group">
            <select name="category" value={form.category} onChange={handleChange} className="form-select" disabled={submitting}>
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
            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="form-textarea" rows="2" disabled={submitting} />
          </div>

          <div className="buttons">
            <button type="submit" className="btn-save" disabled={submitting}>{submitting ? "Guardando..." : "Guardar"}</button>
            <button type="button" onClick={onClose} className="btn-cancel" disabled={submitting}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovementModal;