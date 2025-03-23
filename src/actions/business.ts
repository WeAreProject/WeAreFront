export const fetchBusinessData = async (userId: number) => {
  try {
    // Realizamos la petición para obtener los negocios asociados al usuario logueado
    const response = await fetch(`https://rest-api-weare-production.up.railway.app/api/businesses?owner_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si es necesario, agrega el token de autenticación aquí
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch business data');
    }

    const data = await response.json();
    // Filtramos los negocios para encontrar el que pertenece al usuario logueado
    const business = data.find((item: any) => item.owner_id === userId);
    return business || null;  // Si no se encuentra, devuelve null

  } catch (error) {
    console.error('Error fetching business data:', error);
    return null;
  }
};
