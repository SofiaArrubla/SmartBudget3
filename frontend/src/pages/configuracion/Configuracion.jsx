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
        const cargarPerfil = async () => {
        try {
            const { data } = await fetchAPI("/profile");
            setNombre(data?.user?.nombre || "");
        } catch (error) {
            Swal.fire(
            "Error",
            error.message || "No se pudo cargar el perfil",
            "error"
            );
        }
        };

    cargarPerfil();
}, []);

const actualizarNombre = async () => {
    try {
    const { res, data } = await fetchAPI("/profile", {
        method: "PUT",
        body: JSON.stringify({ nombre })
    });

    if (res.ok) {
        Swal.fire("Éxito",
            data.message,
            "success");
    }
    } catch (error) {
    Swal.fire(
        "Error",
        error.message || "No se pudo actualizar el nombre",
        "error"
    );
    }
};

const cambiarEmail = async () => {
    try{
        const {res, data} = await fetchAPI("/email", {
            method: "PUT",
            body: JSON.stringify({email})
        });

        if(res.ok){
            Swal.fire(
                "Éxito",
                data.message,
                "success"
            );
        }
    }catch(error){
        Swal.fire(
            "Error",
            error.message || "No se pudo actualizar el Email",
            "error"
        )
    }
}

const cambiarPassword = async () => {
    try {
    const { res, data } = await fetchAPI("/password", {
        method: "PUT",
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        Swal.fire("Éxito",
            data.message,
            "success");
        setPassword("");
    }

    } catch (error) {
    Swal.fire(
        "Error",
        error.message || "No se pudo cambiar la contraseña",
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

                <button onClick={actualizarNombre}>
                    Guardar nombre
                </button>
            </div>
        )}

        {active === "seguridad" && (
            <div className="config-card">
                <h3>Seguridad</h3>

                <input
                type="email"
                placeholder="Nuevo correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />    

                <button onClick={cambiarEmail}>
                    Cambiar correo
                </button>    

                <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={cambiarPassword}>
                    Cambiar contraseña
                </button>        
            </div>
        )}

        {active === "preferencias" &&(
            <div className="config-card">
                <h3>Preferencias</h3>

                <p>Proximamente:</p>
                <ul>
                    <li>Moneda por defecto</li>
                    <li>Modo oscuro/claro</li>
                    <li>Notificaciones</li>
                </ul>
            </div>
        )}

        {active === "cuenta" &&(
            <div className="config-card danger">
                <h3>Zona peligrosa</h3>

                <button className="danger-btn">
                    Eliminar cuenta
                </button>
            </div>
        )}
    </div>
    </div>
);
};

export default Configuracion;