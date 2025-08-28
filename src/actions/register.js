export const registerCustomer = async (formData) => {
    try {
        const response = await fetch("https://rest-api-weare-production.up.railway.app/api/customers/register", {
            method: "POST",
            body: formData, // Se envía como FormData para incluir la imagen
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
        return data; // Devuelve los datos del usuario registrado
    }
    catch (error) {
        console.error("Error registering customer:", error);
        throw error;
    }
};
// actions/register.ts
export const registerOwner = async (formData) => {
    try {
        const response = await fetch("https://rest-api-weare-production.up.railway.app/api/owners/register", // Endpoint para el owner
        {
            method: "POST",
            body: formData, // Se envía como FormData para incluir la imagen
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
        return data; // Devuelve los datos del usuario registrado
    }
    catch (error) {
        console.error("Error registering owner:", error);
        throw error;
    }
};
export const registerBusiness = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        // Asegurarse de que los archivos se envíen correctamente
        const imageFile = formData.get('image');
        const licenseFile = formData.get('professional_license');
        if (!imageFile || !licenseFile) {
            throw new Error('Image and professional license are required');
        }
        const response = await fetch("https://rest-api-weare-production.up.railway.app/api/businesses/register", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(errorData.message || 'Business registration failed');
        }
        const data = await response.json();
        return { success: true, data };
    }
    catch (error) {
        console.error("Error registering business:", error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
};
