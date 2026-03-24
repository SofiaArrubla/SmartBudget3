import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
const { isAuth } = useAuth();

  // Si NO está autenticado → lo manda al login
if (!isAuth) {
    return <Navigate to="/login" />;
}

  // Si SÍ está autenticado → muestra la página
return children;
}

export default PrivateRoute;