const API_URL = "https://rest-api-weare-production.up.railway.app/api";
export const fetchBusinessData = async (ownerId) => {
    try {
        const response = await fetch(`${API_URL}/businesses/owner/${ownerId}`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del negocio');
        }
        const data = await response.json();
        // Si la respuesta es un array, tomamos el primer negocio
        return Array.isArray(data) ? data[0] : data;
    }
    catch (error) {
        console.error('Error fetching business data:', error);
        throw error;
    }
};
