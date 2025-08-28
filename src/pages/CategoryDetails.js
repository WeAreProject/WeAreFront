import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
const categoryData = {
    salud: {
        name: "Salud y Medicina",
        services: [
            "Médico general",
            "Cirujano",
            "Enfermero",
            "Psicólogo",
            "Veterinario",
            "Nutriólogo",
            "Dentista",
            "Ginecólogo",
        ],
        servicesCount: "15 servicios"
    },
    belleza: {
        name: "Belleza y Cuidado Personal",
        services: [
            "Estilista",
            "Maquillista",
            "Barbero",
            "Manicurista",
        ],
        servicesCount: "9 servicios"
    },
    educacion: {
        name: "Educación y Docencia",
        services: [
            "Maestro de primaria",
            "Profesor de universidad",
            "Tutor privado",
        ],
        servicesCount: "10 servicios"
    },
    // ... otras categorías
};
const CategoryDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    if (!id || !categoryData[id]) {
        return (_jsxs("div", { className: "min-h-screen bg-white pt-20 pb-28 px-4 max-w-md mx-auto", children: [_jsx(Header, {}), _jsx("h1", { className: "text-2xl font-bold text-center text-gray-900 mb-4", children: "Categor\u00EDa no encontrada" }), _jsx(BottomNav, {})] }));
    }
    const { name, services, servicesCount } = categoryData[id];
    const state = location.state || {};
    return (_jsxs("div", { className: "min-h-screen bg-white pt-20 pb-28 px-4 max-w-md mx-auto", children: [_jsx(Header, {}), _jsxs("h1", { className: "text-2xl font-bold text-center text-gray-900 mb-4", children: ["Servicios en ", name] }), _jsx("p", { className: "text-center text-gray-500 mb-4", children: servicesCount }), services.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No hay servicios registrados." })) : (_jsx("ul", { className: "space-y-2", children: services.map((servicio, i) => (_jsx("li", { className: "bg-purple-100 text-purple-800 px-4 py-2 rounded-lg shadow-sm text-sm", children: servicio }, i))) })), _jsx(BottomNav, {})] }));
};
export default CategoryDetail;
