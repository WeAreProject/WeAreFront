export const registerCustomer = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://rest-api-weare-production.up.railway.app/api/customers/register",
        {
          method: "POST",
          body: formData, // Se envía como FormData para incluir la imagen
          
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      return data; // Devuelve los datos del usuario registrado
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  };
  


  // actions/register.ts

export const registerOwner = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://rest-api-weare-production.up.railway.app/api/owners/register", // Endpoint para el owner
        {
          method: "POST",
          body: formData, // Se envía como FormData para incluir la imagen
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      return data; // Devuelve los datos del usuario registrado
    } catch (error) {
      console.error("Error registering owner:", error);
      throw error;
    }
  };
  