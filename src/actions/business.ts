// actions/business.ts

export const fetchBusinessData = async (userId: number) => {
    try {
      // Cambié la URL para incluir el parámetro `owner_id` con el ID del usuario logueado
      const response = await fetch(`https://rest-api-weare-production.up.railway.app/api/businesses?owner_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Si es necesario agregar un token de autenticación, descomenta la siguiente línea:
          // 'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch business data');
      }
  
      const data = await response.json();
      return data.length > 0 ? data[0] : null;  // Devuelve el primer negocio encontrado o null si no hay resultados
    } catch (error) {
      console.error('Error fetching business data:', error);
      return null;
    }
  };
  
  