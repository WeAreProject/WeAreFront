export const loginUser = async (credentials) => {
    try {
        const response = await fetch("https://rest-api-weare-production.up.railway.app/api/customers/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        if (!response.ok) {
            throw new Error(data.message || "Error en el inicio de sesión");
        }
        // Guardamos los datos del usuario y el token por separado
        localStorage.setItem("token", data.token);
        const userData = {
            id: data.id,
            full_name: data.full_name,
            email: data.email,
            username: data.username,
            image: data.image,
            role: data.role
        };
        localStorage.setItem("user", JSON.stringify(userData));
        return data;
    }
    catch (error) {
        console.error("Error detallado:", error);
        throw error;
    }
};
