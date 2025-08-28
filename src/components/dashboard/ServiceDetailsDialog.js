import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ServiceDetailsDialog = ({ onClose, service }) => {
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (service?.customer_id) {
            setTimeout(() => {
                setCustomer({
                    id: service.customer_id,
                    name: "John Doe",
                    avatar: "/avatar.jpg",
                    email: "john@example.com",
                    phone: "+1234567890",
                    created_at: "2024-01-01",
                });
            }, 500);
        }
    }, [service]);
    const handleBuyService = () => {
        if (service) {
            navigate("/payment-methods", {
                state: {
                    serviceName: service.name,
                    price: service.price,
                },
            });
        }
    };
    if (!service)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsx("div", { className: "bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden", children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: service.name }), _jsx("p", { className: "text-sm text-gray-500", children: service.category })] }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "h-6 w-6" }) })] }), customer ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full overflow-hidden", children: _jsx("img", { src: customer.avatar, alt: customer.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: customer.name }), _jsx("p", { className: "text-sm text-gray-500", children: customer.email })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Status" }), _jsx("p", { className: "font-medium capitalize", children: service.status })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Price" }), _jsxs("p", { className: "font-medium", children: ["$", service.price] })] })] }), _jsxs("div", { className: "border-t pt-4", children: [_jsx("h4", { className: "font-medium mb-2", children: "Service Details" }), _jsx("p", { className: "text-sm text-gray-600", children: service.description })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200", children: "Cerrar" }), _jsx("button", { onClick: handleBuyService, className: "px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700", children: "Comprar Servicio" })] })] })) : (_jsx("div", { className: "flex justify-center items-center h-48", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" }) }))] }) }) }));
};
export default ServiceDetailsDialog;
