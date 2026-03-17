import React from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/inicio/Inicio";
import Login from "./pages/login/Login";
import Configuracion from "./pages/configuracion/Configuracion";
import Espacios from "./pages/espacios/Espacios";
import Metas from "./pages/metas/Metas";
import Movimientos from "./pages/movimientos/Movimientos";
import Registro from "./pages/registro/Registro";
import Reportes from "./pages/reportes/Reportes";

import PrivateRoute from "./components/PrivateRoute";

function App() {
return (
  <BrowserRouter>
  <Navbar />
  <Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/login" element={<Login />} />
  <Route path="/registro" element={<Registro />} />

  <Route path="/movimientos" element={
    <PrivateRoute>
    <Movimientos />
    </PrivateRoute>
    } />

  <Route path="/metas" element={
    <PrivateRoute>
      <Metas />
    </PrivateRoute>
    } />

  <Route path="/espacios" element={
    <PrivateRoute>
      <Espacios />
    </PrivateRoute>  
    } />

  <Route path="/configuracion" element={
    <PrivateRoute>
      <Configuracion />
    </PrivateRoute>
    } />

  <Route path="/reportes" element={
    <PrivateRoute>
      <Reportes />
    </PrivateRoute>
    } />
    
  </Routes>
  </BrowserRouter>

);
}
export default App;