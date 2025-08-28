import { toast } from "sonner";
const API_URL = "https://rest-api-weare-production.up.railway.app/api";
export const getReviewsByBusinessId = async (businessId) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${businessId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las reseñas');
        }
        return await response.json();
    }
    catch (error) {
        toast.error('Error al cargar las reseñas');
        return [];
    }
};
export const calculateAverageRating = (reviews) => {
    if (reviews.length === 0)
        return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;
    // Redondear a un decimal
    return Number(average.toFixed(1));
};
