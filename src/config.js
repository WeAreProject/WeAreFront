// Proxy CORS para desarrollo y producción
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
// URL base de la API
const BASE_API_URL = 'https://rest-api-weare-production.up.railway.app/api';
// Usar el proxy solo en producción
export const API_URL = process.env.NODE_ENV === 'production'
    ? `${CORS_PROXY}${BASE_API_URL}`
    : BASE_API_URL;
