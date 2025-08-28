const API_URL = "https://rest-api-weare-production.up.railway.app/api";
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No se encontró el token de autenticación");
    }
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};
export async function getCategories() {
    try {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_URL}/categories`, { headers });
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                throw new Error("Sesión expirada");
            }
            throw new Error("Error al obtener las categorías");
        }
        const categories = await response.json();
        return categories.map((title, index) => ({
            id: (index + 1).toString(),
            title,
            description: `Servicios relacionados con ${title}`,
            icon: getCategoryImage(title), // Solo cambiamos esta línea
            featured: index < 3,
        }));
    }
    catch (error) {
        console.error("Error en getCategories:", error);
        throw error;
    }
}
export const getCategoryDetails = async (categoryName) => {
    try {
        const headers = getAuthHeaders();
        const response = await fetch(`${API_URL}/categories/${categoryName.toLowerCase()}`, { headers });
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                throw new Error("Sesión expirada");
            }
            throw new Error("Error al obtener los detalles de la categoría");
        }
        const data = await response.json();
        const servicesWithProvider = await Promise.all(data.services.map(async (service) => {
            const businessResponse = await fetch(`${API_URL}/businesses/${service.business_id}`, { headers });
            if (!businessResponse.ok) {
                if (businessResponse.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    throw new Error("Sesión expirada");
                }
                throw new Error("Error al obtener la información del negocio");
            }
            const businessData = await businessResponse.json();
            return {
                ...service,
                provider: {
                    name: businessData.business_name || "Proveedor",
                    image: businessData.image || "/images/default-business.jpg", // Imagen local por defecto
                    rating: 4.5,
                    reviews: 150,
                },
            };
        }));
        return {
            businesses: data.businesses,
            services: servicesWithProvider,
        };
    }
    catch (error) {
        console.error("Error en getCategoryDetails:", error);
        throw error;
    }
};
// Versión original de normalizeTitle
function normalizeTitle(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
// Mapeo de categorías con sus imágenes (modificado para usar imágenes locales)
const iconMapNormalized = {
    tecnologia: "1212.png",
    belleza: "beauty-category.jpg",
    cafe: "cafe-category.jpg",
    comidamexicana: "food-category.jpg",
    deportes: "sports-category.jpg",
    medicina: "health-category.jpg",
};
// Función modificada para usar imágenes locales
function getCategoryImage(title) {
    const normalizedTitle = normalizeTitle(title);
    const filename = iconMapNormalized[normalizedTitle] || "default-category.jpg";
    return `/images/categories/${filename}`; // Ruta a imágenes en public/images/categories/
}
