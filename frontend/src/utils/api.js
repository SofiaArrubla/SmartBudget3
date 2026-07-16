const API_URL = "http://localhost:3000/api";

export const fetchAPI = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error en el servidor: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    
    // Devolvemos el envoltorio { data, res } para que la desestructuración de React funcione.
    return { data, res: response }; 
};