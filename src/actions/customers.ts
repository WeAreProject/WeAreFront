// actions/customers.ts
export const fetchCustomer = async (userId: number) => {
    try {
      // Realizamos la solicitud GET con la URL completa
      const response = await fetch(`https://rest-api-weare-production.up.railway.app/api/customers/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Si necesitas un token de autenticación, puedes agregarlo aquí
          // 'Authorization': `Bearer ${token}`
        }
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error fetching customer data');
      }
  
      // Retornamos los datos en formato JSON
      return await response.json();
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;  // O puedes manejar el error de otra manera si lo prefieres
    }
  };
  
  