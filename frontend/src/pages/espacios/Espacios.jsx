import React, { useState } from 'react';
import './Espacios.css';

const Espacios = () => {

  /**
   * Información de espacios de ahorro (simulada)
   */
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: 'Vacaciones en la playa',
      type: 'individual',
      currentAmount: 2500,
      targetAmount: 5000,
      currency: '$',
      color: '#4CAF50',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fondo de emergencia',
      type: 'shared',
      currentAmount: 8000,
      targetAmount: 10000,
      currency: '$',
      color: '#2196F3',
      sharedWith: [
        { id: 1, name: 'Ana García', email: 'ana@email.com', avatar: 'A' },
        { id: 2, name: 'Carlos López', email: 'carlos@email.com', avatar: 'C' },
        { id: 3, name: 'María Rodríguez', email: 'maria@email.com', avatar: 'M' }
      ],
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Nuevo auto',
      type: 'individual',
      currentAmount: 15000,
      targetAmount: 25000,
      currency: '$',
      color: '#FF9800',
      createdAt: '2024-01-05'
    }
  ]);

  /**
   * Estados para manejo de UI y formularios
   */
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newSpace, setNewSpace] = useState({
    name: '',
    type: 'individual',
    targetAmount: '',
    currency: '$',
    color: '#4CAF50',
    sharedWith: []
  });
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [showUserInput, setShowUserInput] = useState(false);
  const [editingAmount, setEditingAmount] = useState(null);
  const [editAmountValue, setEditAmountValue] = useState('');

  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4', '#FFC107', '#795548'];

  /**
   * 
   * Validación de campos
   */
  const handleCreateSpace = () => {
    if (!newSpace.name.trim() || !newSpace.targetAmount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    /**
     * Creación de nuevo espacio con ID único y fecha de creación
     */
    const spaceWithId = {
      ...newSpace,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      currentAmount: 0,
      targetAmount: parseFloat(newSpace.targetAmount),
      sharedWith: newSpace.type === 'shared' ? newSpace.sharedWith : undefined
    };
    setSpaces([...spaces, spaceWithId]);
    setNewSpace({
      name: '',
      type: 'individual',
      targetAmount: '',
      currency: '$',
      color: '#4CAF50',
      sharedWith: []
    });
    setShowModal(false);
  };

  /**
   * 
   * Eliminación espacios
   */

  const handleDeleteSpace = (spaceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este espacio de ahorro?')) {
      setSpaces(spaces.filter(space => space.id !== spaceId));
    }
  };

  const handleUpdateAmount = (spaceId, newAmount) => {
    setSpaces(spaces.map(space => 
      space.id === spaceId 
        ? { ...space, currentAmount: newAmount }
        : space
    ));
    setEditingAmount(null);
  };

  /**
   * Gestión de usuarios compartidos en espacios compartidos
   */
  const addUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      setNewSpace({
        ...newSpace,
        sharedWith: [...newSpace.sharedWith, { 
          ...newUser, 
          id: Date.now(),
          avatar: newUser.name.charAt(0).toUpperCase()
        }]
      });
      setNewUser({ name: '', email: '' });
      setShowUserInput(false);
    }
  };

  /**
   * 
   * Eliminación de usuarios compartidos de un espacio compartido
   */

  const removeUser = (userId) => {
    setNewSpace({
      ...newSpace,
      sharedWith: newSpace.sharedWith.filter(user => user.id !== userId)
    });
  };

  /**
   * 
   * Edición rápida del monto actual al hacer click sobre él en la tarjeta del espacio de ahorro
   */
  const startEditingAmount = (space) => {
    setEditingAmount(space.id);
    setEditAmountValue(space.currentAmount);
  };

  /**
   * Filtrado de espacios según tipo (individual, compartido o todos) para mostrar en la UI
   */

  const filteredSpaces = spaces.filter(space => {
    if (filter === 'all') return true;
    return space.type === filter;
  });

  /**
   * Cálculo de estadísticas generales para mostrar en tarjetas informativas en la parte superior de la página
   */
  const stats = {
    totalSpaces: spaces.length,
    totalSaved: spaces.reduce((sum, space) => sum + space.currentAmount, 0),
    totalTarget: spaces.reduce((sum, space) => sum + space.targetAmount, 0)
  };

  return (
    <div className="espacios-container">
      <div className="espacios-header">
        <div>
          <h1>Mis Espacios de Ahorro</h1>
          <p>Organiza tus metas financieras</p>
        </div>
        <button className="create-space-btn" onClick={() => setShowModal(true)}>
          + Crear nuevo espacio
        </button>
      </div>

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

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          Todos ({spaces.length})
        </button>
        <button className={`filter-tab ${filter === 'individual' ? 'active' : ''}`} onClick={() => setFilter('individual')}>
          Individuales ({spaces.filter(s => s.type === 'individual').length})
        </button>
        <button className={`filter-tab ${filter === 'shared' ? 'active' : ''}`} onClick={() => setFilter('shared')}>
          Compartidos ({spaces.filter(s => s.type === 'shared').length})
        </button>
      </div>

      <div className="spaces-grid">
        {filteredSpaces.map(space => {
          const progress = (space.currentAmount / space.targetAmount) * 100;
          const remaining = space.targetAmount - space.currentAmount;
          const [showSharedUsers, setShowSharedUsers] = useState(false);

          return (
            <div key={space.id} className="space-card" style={{ borderTopColor: space.color }}>
              <div className="card-header">
                <div className="card-title">
                  <h3>{space.name}</h3>
                  <span className={`space-type ${space.type}`}>
                    {space.type === 'individual' ? '👤 Individual' : '👥 Compartido'}
                  </span>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteSpace(space.id)} title="Eliminar espacio">
                  🗑️
                </button>
              </div>

              <div className="card-content">
                <div className="amount-section">
                  <div className="current-amount">
                    <label>Monto actual</label>
                    {editingAmount === space.id ? (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateAmount(space.id, parseFloat(editAmountValue));
                      }} className="edit-amount-form">
                        <input
                          type="number"
                          value={editAmountValue}
                          onChange={(e) => setEditAmountValue(e.target.value)}
                          step="100"
                          autoFocus
                        />
                        <button type="submit">✓</button>
                        <button type="button" onClick={() => setEditingAmount(null)}>✗</button>
                      </form>
                    ) : (
                      <div className="amount-display" onClick={() => startEditingAmount(space)}>
                        <span className="amount-value">{space.currency}{space.currentAmount.toLocaleString()}</span>
                        <span className="edit-icon">✏️</span>
                      </div>
                    )}
                  </div>
                  <div className="target-amount">
                    <label>Meta</label>
                    <span>{space.currency}{space.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: space.color }} />
                  </div>
                  <div className="progress-stats">
                    <span>{progress.toFixed(1)}% completado</span>
                    <span>Faltan {space.currency}{remaining.toLocaleString()}</span>
                  </div>
                </div>

                {space.type === 'shared' && space.sharedWith && (
                  <div className="shared-section">
                    <button className="shared-toggle" onClick={() => setShowSharedUsers(!showSharedUsers)}>
                      👥 Compartido con {space.sharedWith.length} {space.sharedWith.length === 1 ? 'persona' : 'personas'}
                      <span className="toggle-icon">{showSharedUsers ? '▲' : '▼'}</span>
                    </button>
                    
                    {showSharedUsers && (
                      <div className="shared-users-list">
                        {space.sharedWith.map(user => (
                          <div key={user.id} className="shared-user">
                            <div className="user-avatar" style={{ backgroundColor: space.color }}>
                              {user.avatar}
                            </div>
                            <div className="user-info">
                              <div className="user-name">{user.name}</div>
                              <div className="user-email">{user.email}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="card-footer">
                <div className="creation-date">
                  📅 Creado el {new Date(space.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSpaces.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏦</div>
          <h3>No hay espacios de ahorro</h3>
          <p>Comienza creando tu primer espacio de ahorro</p>
          <button className="create-space-btn" onClick={() => setShowModal(true)}>
            Crear espacio
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Crear nuevo espacio de ahorro</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del espacio *</label>
                <input
                  type="text"
                  placeholder="Ej: Vacaciones, Fondo de emergencia, etc."
                  value={newSpace.name}
                  onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Tipo de espacio *</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={`type-option ${newSpace.type === 'individual' ? 'active' : ''}`}
                    onClick={() => setNewSpace({ ...newSpace, type: 'individual', sharedWith: [] })}
                  >
                    👤 Individual
                  </button>
                  <button
                    type="button"
                    className={`type-option ${newSpace.type === 'shared' ? 'active' : ''}`}
                    onClick={() => setNewSpace({ ...newSpace, type: 'shared', sharedWith: [] })}
                  >
                    👥 Compartido
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Moneda</label>
                  <select
                    value={newSpace.currency}
                    onChange={(e) => setNewSpace({ ...newSpace, currency: e.target.value })}
                  >
                    <option value="$">$ (Dólar)</option>
                    <option value="€">€ (Euro)</option>
                    <option value="£">£ (Libra)</option>
                    <option value="¥">¥ (Yen)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Meta de ahorro *</label>
                  <input
                    type="number"
                    placeholder="Monto objetivo"
                    value={newSpace.targetAmount}
                    onChange={(e) => setNewSpace({ ...newSpace, targetAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Color del espacio</label>
                <div className="color-picker">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${newSpace.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewSpace({ ...newSpace, color })}
                    />
                  ))}
                </div>
              </div>

              {newSpace.type === 'shared' && (
                <div className="form-group">
                  <label>Compartir con</label>
                  <div className="shared-users-management">
                    {newSpace.sharedWith.length > 0 && (
                      <div className="added-users">
                        {newSpace.sharedWith.map(user => (
                          <div key={user.id} className="added-user">
                            <span>{user.name} ({user.email})</span>
                            <button type="button" className="remove-user" onClick={() => removeUser(user.id)}>
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {showUserInput ? (
                      <div className="add-user-form">
                        <input
                          type="text"
                          placeholder="Nombre"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <button type="button" onClick={addUser}>Agregar</button>
                        <button type="button" onClick={() => setShowUserInput(false)}>Cancelar</button>
                      </div>
                    ) : (
                      <button type="button" className="add-user-btn" onClick={() => setShowUserInput(true)}>
                        + Agregar persona
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="submit-btn" onClick={handleCreateSpace}>
                Crear espacio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Espacios;