import { useState, useEffect } from "react";
import { fetchAPI } from "../../utils/api.js";
import Swal from "sweetalert2";
import "./Configuracion.css";

const Configuracion = () => {
    const [active, setActive] = useState("perfil")
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let isMounted = true;

        const cargarPerfil = async () => {
        try {
            const { data } = await fetchAPI("/profile");
            if(isMounted){
                setNombre(data?.user?.nombre || "");
            }
        } catch (error) {
            if(isMounted){
                Swal.fire(
                "Error",
                error.message || "No se pudo cargar el perfil",
                "error"
                );
            }
        }
        };

    cargarPerfil();

    return () => {
        isMounted = false;
    };
}, []);

const handleUpdate = async (endpoint, body, successMsg) => {
    try {
    const { res, data } = await fetchAPI(endpoint, {
        method: "PUT",
        body: JSON.stringify(body)
    });

    if (res.ok) {
        Swal.fire(
            "Exito",
            data.message || successMsg,
            "success"
        );
        if(endpoint === "/password") setPassword("");
        if(endpoint === "/email") setEmail("");
    }
    } catch (error) {
    Swal.fire(
        "Error",
        error.message || "No se pudo cambiar la acción",
        "error"
    );
    }
};

return (
    <div className="config-layout">

    <div className="config-sidebar">
        <h2>Configuración</h2>

        <button
        onClick={() => setActive("perfil")}
        className={active === "perfil" ? "active" : ""}>
            Perfil
        </button>

        <button
        onClick={() => setActive("seguridad")} 
        className={active === "seguridad" ? "active" : ""}>
            Seguridad
        </button>

        <button
        onClick={() => setActive("preferencias")}
        className={active === "preferencias" ? "active" : ""}>
            preferencias
        </button>

        <button
        onClick={() => setActive("cuenta")}
        className={active === "cuenta" ? "active" : ""}>
            cuenta
        </button>
    </div>

    <div className="config-content">
        {active === "perfil" &&(
            <div className="config-card">
                <h3>Perfil</h3>

                <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                />

                <button onClick={() => handleUpdate ("/profile", {nombre}, "Nombre actualizado")}>
                    Guardar nombre
                </button>
            </div>
        )}

        {active === "seguridad" && (
            <div className="config-card">
                <h3>Seguridad</h3>

                <label>Correo Electrónico</label>
                <input
                type="email"
                placeholder="Nuevo correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />    

                <button onClick={() => handleUpdate ("/email", {email}, "Correo Actualizado")}>
                    Cambiar correo
                </button>    

                <div style={{marginTop: "25px"}}>
                    <label>Contraseña</label>
                    <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={() => handleUpdate ("/password", {password}, "Contraseña actualizada")}>
                        Cambiar contraseña
                    </button> 
                </div>       
            </div>
        )}

        {active === "preferencias" &&(
            <div className="config-card">
                <h3>Preferencias</h3>
                <p>Proximamente podrás personalizar:</p>
                <ul style={{color: "#aaa", marginTop: "10px"}}>
                    <li>Moneda por defecto (COP, USD, EUR)</li>
                    <li>Modo claro/oscuro</li>
                    <li>Notificaciones</li>
                </ul>
            </div>
        )}

        {active === "cuenta" &&(
            <div className="config-card danger">
                <h3>Zona peligrosa</h3>
                <p style={{ fontSize: "0.8rem", marginBottom: "15px", color: "#ff5c5c"}}>
                    Esta acción es irreversible. Se borrarán todos tus ahorros y espacios.
                </p>
                <button className="danger-btn"
                onClick={() =>{
                    Swal.fire({
                        title: "¿Estás seguro?",
                        text: "No podrás revertir esto",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#ff5c5c",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sí, eliminar cuenta"
                    })
                }}>
                    Eliminar mi cuenta
                </button>
            </div>
        )}
    </div>
    </div>
);
};

export default Configuracion;