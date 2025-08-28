import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getPurchasesByBusinessId, getServiceById, getBusinessByOwnerId } from "../../actions/services";
import { Clock, Calendar } from "lucide-react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
const ServiceList = ({ status }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user") || "{}");
                if (!userData.id)
                    return;
                const businesses = await getBusinessByOwnerId(userData.id);
                if (!businesses || businesses.length === 0)
                    return;
                const businessId = businesses[0].id;
                const purchases = await getPurchasesByBusinessId(businessId);
                const filteredPurchases = purchases.filter(p => p.status === status);
                // Obtener detalles de cada servicio
                const servicesWithDetails = await Promise.all(filteredPurchases.map(async (purchase) => {
                    try {
                        const serviceDetails = await getServiceById(purchase.service_id);
                        const transformedService = {
                            id: serviceDetails.id.toString(),
                            name: serviceDetails.service_name,
                            description: serviceDetails.description,
                            price: parseFloat(serviceDetails.price),
                            category: serviceDetails.category,
                            thumbnail: serviceDetails.image,
                            status: "active",
                            bookings: 0,
                            business_id: serviceDetails.business_id,
                            service_name: serviceDetails.service_name,
                            image: serviceDetails.image,
                            created_at: serviceDetails.created_at,
                            updated_at: serviceDetails.updated_at,
                        };
                        return {
                            ...purchase,
                            serviceDetails: transformedService,
                        };
                    }
                    catch (error) {
                        console.error(`Error fetching service details for ID ${purchase.service_id}:`, error);
                        return null;
                    }
                }));
                setServices(servicesWithDetails.filter((service) => service !== null));
            }
            catch (error) {
                console.error("Error fetching services:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [status]);
    const handleServiceClick = (service) => {
        setSelectedService(service);
    };
    if (loading) {
        return _jsx("div", { className: "text-center py-4", children: "Cargando..." });
    }
    if (services.length === 0) {
        return _jsx("div", { className: "text-center py-4", children: "No hay servicios en este estado" });
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid gap-4", children: services.map((service) => (_jsx("div", { className: "p-6 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer", onClick: () => handleServiceClick(service), children: _jsxs("div", { className: "flex gap-6", children: [_jsx("div", { className: "w-32 h-32 flex-shrink-0", children: _jsx("img", { src: service.serviceDetails.image || "https://via.placeholder.com/150", alt: service.serviceDetails.name, className: "w-full h-full object-cover rounded-lg" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900", children: service.serviceDetails.name }), _jsx("span", { className: "inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mt-2", children: service.serviceDetails.category })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-bold text-primary", children: ["$", service.price] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mt-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: new Date(service.purchase_date).toLocaleDateString() })] })] })] }), _jsx("p", { className: "text-gray-600 mt-2 line-clamp-2", children: service.serviceDetails.description }), _jsxs("div", { className: "mt-4 flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4 text-gray-500" }), _jsxs("span", { className: "text-sm text-gray-500", children: ["Estado: ", _jsx("span", { className: "capitalize", children: service.status })] })] })] })] }) }, service.id))) }), selectedService && (_jsx(ServiceDetailsDialog, { service: selectedService.serviceDetails, onClose: () => setSelectedService(null) }))] }));
};
const ServiceTabs = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const tabs = [
        { id: "pending", label: "Pendientes" },
        { id: "ongoing", label: "En Progreso" },
        { id: "completed", label: "Completados" },
        { id: "canceled", label: "Cancelados" },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex space-x-4 border-b", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: `px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500 hover:text-gray-700"}`, children: tab.label }, tab.id))) }), _jsx(ServiceList, { status: activeTab })] }));
};
export default ServiceTabs;
