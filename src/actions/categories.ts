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

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export async function getCategories(): Promise<Category[]> {
  try {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_URL}/categories`, { headers });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error("Sesión expirada");
      }
      throw new Error("Error al obtener las categorías");
    }
    
    const categories = await response.json();
    
    return categories.map((title: string, index: number) => ({
      id: (index + 1).toString(),
      title,
      description: `Servicios relacionados con ${title}`,
      icon: getCategoryIcon(title),
      featured: index < 3,
    }));
  } catch (error) {
    console.error("Error en getCategories:", error);
    throw error;
  }
}

export const getCategoryDetails = async (categoryName: string): Promise<CategoryDetails> => {
  try {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_URL}/categories/${categoryName.toLowerCase()}`, { headers });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error("Sesión expirada");
      }
      throw new Error('Error al obtener los detalles de la categoría');
    }
    
    const data = await response.json();
    
    const servicesWithProvider = await Promise.all(
      data.services.map(async (service: Service) => {
        const businessResponse = await fetch(`${API_URL}/businesses/${service.business_id}`, { headers });
        
        if (!businessResponse.ok) {
          if (businessResponse.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error("Sesión expirada");
          }
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
    console.error('Error en getCategoryDetails:', error);
    throw error;
  }
};

function getCategoryIcon(title: string): string {
  const iconMap: { [key: string]: string } = {
    Tech: "briefcase",
    Beauty: "heart",
    cafe: "coffee",
  };
  
  return iconMap[title] || "star";
} 