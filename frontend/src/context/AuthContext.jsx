import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchAPI } from "../utils/api"; // Importamos tu fetchAPI centralizado

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setLoading(false);
  }, []);

  // Corregido: Ahora es una función asíncrona (async)
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      return;
    }

    try {
      // Corregido: Usamos fetchAPI con await para conectarnos al endpoint del backend de forma segura
      const { data } = await fetchAPI("/profile");
      
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      console.error("Error al verificar la autenticación:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    setUser(userData);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, loading, checkAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);