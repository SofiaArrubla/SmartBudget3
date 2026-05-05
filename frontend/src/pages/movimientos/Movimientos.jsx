import React from "react";
import "./Movimientos.css";

const Movimientos = () => {
    return (

        <div className="container">
            <main className="main">
            <header className="header">
                <h3>Movimientos</h3>
                <button className="btn">+ Nuevo movimiento</button>
            </header>
              
            <div className="cards">
                <div className=" card ingreso">
                    <p>Ingresos del mes</p>
                    <h2>$0.00</h2>
                </div>

                 <div className="card gastos">
                        <p>Gastos del mes</p>
                        <h2>$0.00</h2>
                    </div>

                     <div className="card balance">
                        <p>Balance del mes</p>
                        <h2>$0.00</h2>
                    </div>
            </div>

            <div className="filters-container">
                  <div className="filters">
                    <select>
                        <option>Tipo</option>
                    </select>
                    <select>
                        <option>Categoría</option>
                    </select>
                    <select>
                        <option>Método</option>
                    </select>

                    <input type="date" />
                    <input type="date" />
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
                        <tr>
                            <td className="gasto-text">Gasto</td>
                            <td>$0.00</td>
                            <td>Comida</td>
                            <td>Efectivo</td>
                            <td>2023-10-01</td>
                            <td>Compra en el supermercado</td>
                            <td>
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Borrar</button>
                            </td>
                        </tr>

                        <tr>
                            <td className="ingreso-text">Ingreso</td>
                            <td>$0.00</td>
                            <td>Salario</td>
                            <td>Transferencia</td>
                            <td>2023-10-01</td>
                            <td>Nómina</td>
                            <td>
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </main>
        </div>
        
    );
};

export default Movimientos;