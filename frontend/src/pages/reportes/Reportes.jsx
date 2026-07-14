import React from "react";
import "./Reportes.css";

const Reportes = () => {
    return (
        <div className="report-card">

            {/* HEADER */}

            <div className="page-header">
                <h1>Reportes</h1>
                <p>Analiza tus finanzas y toma mejores decisiones</p>
            </div>

            {/* KPI card: representación visual en un panel de control (dashboard) que muestra el progreso de una métrica específica respecto a un objetivo predefinido*/}

            <div className="kpi-grid">

                <div className="kpi-card">
                    <div className="kpi-label">Ingresos totales</div>
                    <div className="kpi-value">$2.500.000</div>
                    <span className="kpi-trend">
                        ↑ 12% vs. mes anterior
                    </span>
                </div>

                <div className="kpi-card">
                    <div className="kpi-label">Gastos totales</div>
                    <div className="kpi-value">$1.450.000</div>
                    <span className="kpi-trend negative">
                        ↑ 8% vs. mes anterior
                    </span>
                </div>

                <div className="kpi-card">
                    <div className="kpi-label">Ahorro del mes</div>
                    <div className="kpi-value">$1.050.000</div>
                    <span className="kpi-trend">
                        ↑ 20% vs. mes anterior
                    </span>
                </div>

                <div className="kpi-card">
                    <div className="kpi-label">Transacciones</div>
                    <div className="kpi-value">28</div>
                    <div className="kpi-sub">
                        Total de movimientos
                    </div>
                </div>

            </div>

            {/* GRAFICO */}

            <div className="chart-section">

                <div className="chart-header">

                    <h3>Ingresos vs Gastos</h3>

                    <div className="chart-legend">

                        <span>
                            <span className="legend-dot income"></span>
                            Ingresos
                        </span>

                        <span>
                            <span className="legend-dot expense"></span>
                            Gastos
                        </span>

                    </div>

                </div>

                <div className="chart-bars">

                    <div className="bar-group">
                        <div className="bars-container">
                            <div className="bar-income" style={{ height: "86px" }}></div>
                            <div className="bar-expense" style={{ height: "40px" }}></div>
                        </div>
                        <span className="bar-label">1 may</span>
                    </div>

                    <div className="bar-group">
                        <div className="bars-container">
                            <div className="bar-income" style={{ height: "110px" }}></div>
                            <div className="bar-expense" style={{ height: "65px" }}></div>
                        </div>
                        <span className="bar-label">8 may</span>
                    </div>

                    <div className="bar-group">
                        <div className="bars-container">
                            <div className="bar-income" style={{ height: "70px" }}></div>
                            <div className="bar-expense" style={{ height: "95px" }}></div>
                        </div>
                        <span className="bar-label">15 may</span>
                    </div>

                    <div className="bar-group">
                        <div className="bars-container">
                            <div className="bar-income" style={{ height: "40px" }}></div>
                            <div className="bar-expense" style={{ height: "55px" }}></div>
                        </div>
                        <span className="bar-label">22 may</span>
                    </div>

                    <div className="bar-group">
                        <div className="bars-container">
                            <div className="bar-income" style={{ height: "130px" }}></div>
                            <div className="bar-expense" style={{ height: "72px" }}></div>
                        </div>
                        <span className="bar-label">31 may</span>
                    </div>

                </div>

            </div>

            {/* DOS COLUMNAS */}

            <div className="two-col">

                <div className="card-panel">

                    <h4>Gastos por categoría</h4>

                    <div className="category-item">
                        <div className="cat-left">
                            <span
                                className="cat-color"
                                style={{ background: "#2b6df6" }}
                            ></span>
                            <span className="cat-name">Comida</span>
                        </div>

                        <div>
                            <span className="cat-percent">35%</span>
                            <span className="cat-amount">$507.500</span>
                        </div>

                    </div>

                    {/* Continúan las demás categorías igual */}

                </div>

                <div className="card-panel">

                    <h4>Resumen por método de pago</h4>

                    <div className="method-item">
                        <span className="method-left">Efectivo</span>

                        <div className="method-right">
                            <span className="method-amount">$650.000</span>
                            <span className="method-percent">32%</span>
                        </div>

                    </div>

                    {/* Continúan los demás métodos */}

                </div>

            </div>

            {/* TABLA */}

            <div className="table-section">

                <div className="table-header">

                    <h4>Últimos movimientos</h4>

                    <a href="/">Ver todos los movimientos</a>

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                                <th>Método</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td>31 may 2024</td>
                                <td>Supermercado</td>
                                <td>Comida</td>
                                <td>
                                    <span className="badge-expense">
                                        Gasto
                                    </span>
                                </td>
                                <td className="badge-expense">
                                    -$85.000
                                </td>
                                <td>
                                    <span className="method-tag">
                                        Efectivo
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>30 may 2024</td>
                                <td>Pago de nómina</td>
                                <td>Salario</td>
                                <td>
                                    <span className="badge-income">
                                        Ingreso
                                    </span>
                                </td>
                                <td className="badge-income">
                                    +$2.000.000
                                </td>
                                <td>
                                    <span className="method-tag">
                                        Transferencia
                                    </span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Reportes;