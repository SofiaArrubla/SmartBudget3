import { useState, useEffect } from "react";
import { fetchAPI } from "../../utils/api.js";
import Swal from "sweetalert2";

const Configuracion = () => {
const [nombre, setNombre] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useEffect(() => {
    const cargarPerfil = async () => {
    try {
        const { data } = await fetchAPI("/profile");

        console.log("Perfil:", data);

        setNombre(data?.user?.nombre || "");
    } catch (error) {
        console.error(error);

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
            error.message || "No se pudo actualizar el nombre",
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
    <div style={{ padding: "40px" }}>
    <h2>Configuración</h2>

    <div>
        <h3>Perfil</h3>

        <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        />

        <button onClick={actualizarNombre}>
        Guardar nombre
        </button>
    </div>

    <div>
        <h3>Cambiar Email</h3>
        <input 
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={cambiarEmail}>
            Cambiar Correo 
        </button>
    </div>

    <div style={{ marginTop: "20px" }}>
        <h3>Cambiar contraseña</h3>

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
    </div>
);
};

export default Configuracion;