import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../actions/services";
import { getServicesByBusinessId } from "../actions/services";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Star } from "lucide-react";
import { geocodeAddress } from "../utils/geocoding";
import { Toaster } from "sonner";
const BusinessDetails = () => {
    const { businessId } = useParams();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    // Función para generar la URL de Uber con la dirección del negocio
    const getUberUrl = () => {
        if (!business || !coordinates)
            return "https://m.uber.com";
        // Crear el objeto de dirección para Uber
        const addressObject = {
            addressLine1: business.street,
            addressLine2: `${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}`,
            id: "", // Este ID es específico de Google Places y no lo tenemos
            source: "SEARCH",
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            provider: "google_places"
        };
        // Codificar el objeto para la URL
        const encodedAddress = encodeURIComponent(JSON.stringify(addressObject));
        // Formato para ubicación de recogida (pickup)
        return `https://m.uber.com/go/pickup?drop[0]=${encodedAddress}&effect=`;
    };
    useEffect(() => {
        const fetchBusinessData = async () => {
            if (!businessId)
                return;
            try {
                // Obtener negocio
                const businessData = await getBusinessById(parseInt(businessId));
                setBusiness(businessData);
                // Obtener coordenadas
                const address = `${businessData.street}, ${businessData.neighborhood}, ${businessData.city}, ${businessData.state}, ${businessData.country}`;
                const coords = await geocodeAddress(address);
                setCoordinates(coords);
                // Obtener servicios por business_id
                const servicesData = await getServicesByBusinessId(parseInt(businessId));
                setServices(servicesData);
            }
            catch (error) {
                console.error("Error fetching business data:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchBusinessData();
    }, [businessId]);
    const handleOpenModal = (service) => {
        if (!business)
            return;
        const formattedService = {
            ...service,
            provider: {
                name: business.business_name,
                image: business.image,
                rating: 4.5,
                reviews: 150
            }
        };
        setSelectedService(formattedService);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };
    if (loading) {
        return _jsx("div", { className: "text-center text-gray-600", children: "Cargando..." });
    }
    if (!business) {
        return _jsx("div", { className: "text-center text-red-500", children: "No se encontr\u00F3 informaci\u00F3n del negocio." });
    }
    return (_jsxs("div", { className: "bg-white min-h-screen", children: [_jsx(Toaster, { richColors: true, position: "bottom-center" }), _jsx(Header, {}), _jsxs("main", { className: "max-w-5xl mx-auto p-6", children: [_jsx("div", { className: "w-full h-48 sm:h-56 md:h-64 lg:h-80 mb-6 overflow-hidden", children: _jsx("img", { src: business.image, alt: business.business_name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800", children: business.business_name }), _jsx("p", { className: "text-lg sm:text-xl text-gray-600", children: business.description }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Ubicaci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: `${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}` })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Tel\u00E9fono" }), _jsx("p", { className: "text-gray-600", children: business.phone })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Email" }), _jsx("p", { className: "text-gray-600", children: business.email })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Horario de Operaci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: business.operation_hours })] })] })] }), _jsxs("div", { className: "mt-8", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: "Rese\u00F1as de clientes" }), _jsx("div", { className: "text-yellow-500", children: "\u2605\u2605\u2605\u2605\u2605" }), _jsx("p", { className: "text-gray-600 text-sm mt-2", children: "Absolutely amazing experience! The pictures turned out beautifully." })] }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: `https://wa.me/${business.phone}`, target: "_blank", rel: "noopener noreferrer", className: "bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all w-full sm:w-auto inline-block text-center", children: "Contactar por WhatsApp" }) })] }), _jsxs("section", { className: "max-w-5xl mx-auto mt-12 px-6", children: [_jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800", children: "Servicios" }), services.length === 0 ? (_jsx("p", { className: "text-gray-600 text-center", children: "No hay servicios disponibles." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service) => (_jsxs("div", { className: "bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300", children: [_jsx("div", { className: "relative h-40 w-full rounded-t-xl overflow-hidden", children: _jsx("img", { src: service.image, alt: service.service_name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "p-4 space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden border", children: _jsx("img", { src: business.image, alt: business.business_name, className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: business.business_name }), _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400 ml-1" }), _jsx("span", { children: "4.5 (150)" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: service.service_name }), _jsx("p", { className: "text-sm text-gray-500 line-clamp-2", children: service.description })] }), _jsx("div", { className: "flex items-center justify-between text-sm font-medium pt-2", children: _jsxs("span", { children: ["$", service.price] }) }), _jsx("button", { className: "w-full py-2 text-center bg-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition", onClick: () => handleOpenModal(service), children: "Ver Detalles" })] })] }, service.id))) }))] }), _jsxs("section", { className: "max-w-5xl mx-auto mt-12 px-6 mb-12", children: [_jsx("h3", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800", children: "Ubicaci\u00F3n" }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden", children: [_jsx("div", { className: "aspect-video w-full", children: coordinates ? (_jsx("iframe", { src: `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01},${coordinates.lat - 0.01},${coordinates.lon + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`, width: "100%", height: "100%", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", className: "rounded-lg" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-gray-50", children: _jsx("p", { className: "text-gray-500", children: "Cargando mapa..." }) })) }), _jsxs("div", { className: "p-6", children: [_jsx("h4", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Direcci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: `${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}` }), _jsx("div", { className: "mt-4", children: _jsxs("a", { href: getUberUrl(), target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors", children: [_jsx("svg", { className: "w-5 h-5 mr-2", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 3c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9zm.3 13.5l-.3.4v.3c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-.7l-.1-.2-3.2-3.2c-.2-.2-.2-.5 0-.7s.5-.2.7 0l2.8 2.8V6.5c0-.3.2-.5.5-.5s.5.2.5.5v10.8l2.8-2.8c.2-.2.5-.2.7 0s.2.5 0 .7l-3.3 3.2z" }) }), "Pedir Uber"] }) })] })] })] }), isModalOpen && selectedService && (_jsx(Modal, { service: selectedService, onClose: handleCloseModal, isOpen: isModalOpen }))] }));
};
export default BusinessDetails;
