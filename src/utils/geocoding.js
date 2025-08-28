export const geocodeAddress = async (address) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
            headers: {
                'User-Agent': 'WeAreFront/1.0'
            }
        });
        if (!response.ok) {
            throw new Error('Error en la geocodificación');
        }
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    }
    catch (error) {
        console.error('Error en la geocodificación:', error);
        return null;
    }
};
