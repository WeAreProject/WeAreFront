import { Category } from "../pages/categories";

const API_URL = "https://rest-api-weare-production.up.railway.app/api";

export interface Business {
  id: number;
  business_name: string;
  category: string;
  description: string;
  image?: string;
}

export interface Service {
  id: number;
  business_id: number;
  service_name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  provider: {
    name: string;
    image: string;
    rating: number;
    reviews: number;
  };
}

export interface CategoryDetails {
  businesses: Business[];
  services: Service[];
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    
    const categories = await response.json();
    
    // Transformamos los datos de la API al formato que espera nuestra interfaz
    return categories.map((title: string, index: number) => ({
      id: (index + 1).toString(),
      title,
      description: `Servicios relacionados con ${title}`,
      icon: getCategoryIcon(title),
      featured: index < 3, // Las primeras 3 categorías serán destacadas
    }));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const getCategoryDetails = async (categoryName: string): Promise<CategoryDetails> => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryName}`);
    if (!response.ok) {
      throw new Error('Error al obtener los detalles de la categoría');
    }
    const data = await response.json();
    
    // Obtener la información de los negocios para cada servicio
    const servicesWithProvider = await Promise.all(
      data.services.map(async (service: Service) => {
        // Obtener la información del negocio
        const businessResponse = await fetch(`${API_URL}/businesses/${service.business_id}`);
        if (!businessResponse.ok) {
          throw new Error('Error al obtener la información del negocio');
        }
        const businessData = await businessResponse.json();
        
        return {
          ...service,
          provider: {
            name: businessData.business_name || 'Proveedor',
            image: businessData.image || 'https://via.placeholder.com/150',
            rating: 4.5,
            reviews: 150
          }
        };
      })
    );

    return {
      businesses: data.businesses,
      services: servicesWithProvider
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función auxiliar para asignar iconos según la categoría
function getCategoryIcon(title: string): string {
  const iconMap: { [key: string]: string } = {
    Tech: "briefcase",
    Beauty: "heart",
    cafe: "coffee",
    // Agrega más mapeos según necesites
  };
  
  return iconMap[title] || "star"; // Icono por defecto si no hay coincidencia
} 