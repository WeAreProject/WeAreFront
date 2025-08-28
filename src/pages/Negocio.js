import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { fetchBusinessData } from "../actions/business";
import { getServicesByBusinessId } from "../actions/services";
import ServiceModal from "../components/ServiceModal";
import Header from "../components/Header";
import { geocodeAddress } from "../utils/geocoding";
const Negocio = () => {
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState(null);
    useEffect(() => {
        const getBusinessData = async () => {
            const userData = localStorage.getItem("user");
            if (!userData) {
                console.error("No user data found");
                setLoading(false);
                return;
            }
            const { id } = JSON.parse(userData);
            try {
                // Obtener negocio
                const businessData = await fetchBusinessData(id);
                setBusiness(businessData);
                // Obtener coordenadas
                const address = `${businessData.street}, ${businessData.neighborhood}, ${businessData.city}, ${businessData.state}, ${businessData.country}`;
                const coords = await geocodeAddress(address);
                setCoordinates(coords);
                // Obtener servicios por business_id
                try {
                    const servicesData = await getServicesByBusinessId(businessData.id);
                    setServices(servicesData);
                }
                catch (error) {
                    console.log("No hay servicios registrados para este negocio");
                    setServices([]);
                }
            }
            catch (error) {
                console.error("Error fetching business data:", error);
            }
            finally {
                setLoading(false);
            }
        };
        getBusinessData();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "text-xl", children: "Cargando..." }) }));
    }
    if (!business) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "text-xl text-red-500", children: "No se encontr\u00F3 informaci\u00F3n del negocio." }) }));
    }
    return (_jsxs("div", { className: "bg-gray-100 min-h-screen p-4 sm:p-6 md:p-12 lg:p-16", children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl shadow-xl", children: [_jsx("div", { className: "w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-300 flex items-center justify-center rounded-lg mb-6 overflow-hidden", children: _jsx("img", { src: business.image, alt: business.business_name, className: "w-full h-full object-cover rounded-lg" }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800", children: business.business_name }), _jsx("p", { className: "text-lg sm:text-xl text-gray-600", children: business.description }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4", children: [_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Ubicaci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: `${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}` })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Tel\u00E9fono" }), _jsx("p", { className: "text-gray-600", children: business.phone })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Email" }), _jsx("p", { className: "text-gray-600", children: business.email })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Horario de Operaci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: business.operation_hours })] })] })] }), _jsxs("section", { className: "mt-12", children: [_jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800", children: "Servicios" }), services.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-gray-600 text-lg", children: "No hay servicios registrados a\u00FAn." }), _jsx("p", { className: "text-gray-500 mt-2", children: "Puedes agregar servicios desde el panel de administraci\u00F3n." })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service) => (_jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer", onClick: () => setSelectedService(service), children: [_jsx("h4", { className: "text-xl font-semibold text-gray-800", children: service.service_name }), _jsx("p", { className: "text-gray-600 mt-2", children: service.description }), _jsxs("p", { className: "text-purple-600 font-semibold mt-2", children: ["$", service.price] })] }, service.id))) }))] }), _jsxs("section", { className: "mt-12", children: [_jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800", children: "Ubicaci\u00F3n" }), _jsxs("div", { className: "bg-white rounded-lg shadow-xl overflow-hidden", children: [_jsx("div", { className: "aspect-video w-full", children: coordinates ? (_jsx("iframe", { src: `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01},${coordinates.lat - 0.01},${coordinates.lon + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`, width: "100%", height: "100%", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", className: "rounded-lg" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-gray-100", children: _jsx("p", { className: "text-gray-500", children: "Cargando mapa..." }) })) }), _jsxs("div", { className: "p-6", children: [_jsx("h4", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Direcci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: `${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}` })] })] })] })] }), selectedService && (_jsx(ServiceModal, { service: selectedService, onClose: () => setSelectedService(null) }))] }));
};
export default Negocio;
