interface Service {
  id: number;
  business_id: number;
  service_name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface Business {
  id: number;
  business_name: string;
  image: string;
  // Otros campos del negocio que necesites
}

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(
      "https://rest-api-weare-production.up.railway.app/api/services"
    );

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getBusinessById = async (id: number): Promise<Business> => {
  try {
    const response = await fetch(
      `https://rest-api-weare-production.up.railway.app/api/businesses/${id}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener el negocio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching business:", error);
    throw error;
  }
}; 