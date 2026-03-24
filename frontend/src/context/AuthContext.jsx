import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isAuth, setIsAuth] = useState(false);
const [user, setUser] = useState(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    
    if(token){
        try{
        const decode = JSON.parse(atob(token.split(".")[1]));

        setIsAuth(true);
        setUser(decode);
    }catch(error){
        logout();
        }
    }
}, []);


const login = (token, userData) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    setUser(userData);
};

const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
};

return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);