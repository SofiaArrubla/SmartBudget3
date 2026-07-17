import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({children}) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Cargando aplicación...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;