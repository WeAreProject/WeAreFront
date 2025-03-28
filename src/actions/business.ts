const API_URL = "https://rest-api-weare-production.up.railway.app/api";

interface Business {
  id: number;
  business_name: string;
  owner_id: number;
  category: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  operation_hours: string;
  social_media_links: string;
  tax_id: string;
  professional_license: string;
  image: string;
}

export const fetchBusinessData = async (ownerId: number): Promise<Business> => {
  try {
    const response = await fetch(`${API_URL}/businesses/owner/${ownerId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener los datos del negocio');
    }

    const data = await response.json();
    // Si la respuesta es un array, tomamos el primer negocio
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    throw error;
  }
};