import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
const Modal = ({ isOpen, onClose, service, onPurchase }) => {
    const [notification, setNotification] = React.useState(null);
    React.useEffect(() => {
        if (!isOpen)
            setNotification(null);
    }, [isOpen]);
    if (!isOpen || !service)
        return null;
    const handlePurchase = () => {
        try {
            onPurchase(service);
            setNotification({ type: 'success', message: '¡Producto comprado exitosamente!' });
            setTimeout(onClose, 1500);
        }
        catch (error) {
            setNotification({ type: 'error', message: 'Error al realizar la compra' });
        }
    };
    const handleImageError = (e) => {
        const target = e.target;
        target.src = "/images/default-service.png";
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative", children: [notification && (_jsxs("div", { className: `absolute top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center space-x-2`, children: [notification.type === 'success' ? _jsx(CheckCircle, { className: "w-5 h-5" }) : _jsx(AlertCircle, { className: "w-5 h-5" }), _jsx("span", { children: notification.message })] })), _jsx("button", { className: "absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900", onClick: onClose, children: _jsx(X, { size: 20 }) }), _jsx("div", { className: "p-6 border-b border-gray-200", children: _jsx("h2", { className: "text-xl font-semibold", children: service.service_name }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden border", children: _jsx("img", { src: service.provider.image, alt: service.provider.name, className: "w-full h-full object-cover", onError: handleImageError }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: service.provider.name }), _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx("span", { children: service.provider.rating }), _jsx("span", { className: "mx-1", children: "\u2022" }), _jsxs("span", { children: [service.provider.reviews, " reviews"] })] }), _jsx("p", { className: "text-sm text-gray-500", children: service.category })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("p", { className: "text-sm text-gray-500", children: service.description }), _jsx("div", { className: "mt-4 flex items-center justify-between", children: _jsxs("p", { className: "text-lg font-semibold", children: ["$", service.price] }) })] })] }), _jsx("div", { className: "p-6 border-t border-gray-200", children: _jsx("button", { className: "w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors", onClick: handlePurchase, children: "Comprar Servicio" }) })] }) }));
};
export default Modal;
