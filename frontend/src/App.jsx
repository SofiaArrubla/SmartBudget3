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


function App() {
return (

  <BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Inicio />} />
<Route path="/login" element={<Login />} />
<Route path="/configuracion" element={<Configuracion />} />
<Route path="/espacios" element={<Espacios />} />
<Route path="/metas" element={<Metas />} />
<Route path="/movimientos" element={<Movimientos />} />
<Route path="/registro" element={<Registro />} />
<Route path="/reportes" element={<Reportes />} />

</Routes>
  </BrowserRouter>

);
}
export default App;