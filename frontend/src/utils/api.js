const API_URL = "http://localhost:3000/api";

export const fetchAPI = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });

        const contentType = res.headers.get("content-type");

        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = { message: "Respuesta no válida del servidor" };
        }

        // Manejo global de errores
        if (!res.ok) {
            throw {
                status: res.status,
                message: data.message || "Error en la petición"
            };
        }

        return { res, data };

    } catch (error) {
        throw error;
    }
};