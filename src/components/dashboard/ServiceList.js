import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MessageCircle, CheckCircle, XCircle } from "lucide-react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
const mockServices = [
    {
        id: "1",
        name: "Website Design",
        description: "Professional website design service",
        price: 1500,
        category: "Design",
        thumbnail: "/placeholder.svg",
        status: "pending",
        bookings: 0,
        client: {
            name: "Alex Thompson",
            avatar: "/placeholder.svg",
        },
        date: "2024-03-20",
        time: "14:30",
        payment: "pending",
    },
    {
        id: "2",
        name: "SEO Optimization",
        description: "Search engine optimization service",
        price: 1500,
        category: "Marketing",
        thumbnail: "/placeholder.svg",
        status: "ongoing",
        bookings: 1,
        client: {
            name: "Sarah Wilson",
            avatar: "/placeholder.svg",
        },
        date: "2024-03-21",
        time: "10:00",
        payment: "paid",
        earnings: 1500,
    },
];
const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "ongoing":
            return "bg-blue-100 text-blue-800";
        case "completed":
            return "bg-green-100 text-green-800";
        case "canceled":
            return "bg-red-100 text-red-800";
    }
};
const getPaymentColor = (payment) => {
    switch (payment) {
        case "paid":
            return "bg-green-100 text-green-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "refunded":
            return "bg-red-100 text-red-800";
    }
};
const ServiceList = ({ status }) => {
    const [selectedService, setSelectedService] = useState(null);
    const filteredServices = mockServices.filter((service) => service.status === status);
    const handleOpenDialog = (service) => {
        setSelectedService(service);
    };
    return (_jsxs("div", { className: "space-y-4", children: [filteredServices.map((service) => (_jsxs("div", { className: "p-6 flex justify-between items-center rounded-lg shadow-md cursor-pointer backdrop-blur-sm bg-white/50 transition-all hover:shadow-lg", onClick: () => handleOpenDialog(service), children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "h-12 w-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center", children: _jsx("img", { src: service.client.avatar, alt: service.client.name, className: "h-full w-full object-cover" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: service.name }), _jsx("p", { className: "text-sm text-gray-500", children: service.category }), _jsxs("div", { className: "flex space-x-2 mt-1", children: [_jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded ${getStatusColor(service.status)}`, children: service.status }), _jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded ${getPaymentColor(service.payment)}`, children: service.payment })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [service.earnings && (_jsxs("span", { className: "text-lg font-semibold text-green-600", children: ["$", service.earnings] })), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { className: "p-2 rounded-full border hover:bg-gray-100", children: _jsx(MessageCircle, { className: "h-4 w-4" }) }), service.status === "pending" && (_jsx("button", { className: "p-2 rounded-full border text-red-600 hover:bg-red-100", children: _jsx(XCircle, { className: "h-4 w-4" }) })), service.status === "ongoing" && (_jsx("button", { className: "p-2 rounded-full border text-green-600 hover:bg-green-100", children: _jsx(CheckCircle, { className: "h-4 w-4" }) }))] })] })] }, service.id))), _jsx(ServiceDetailsDialog, { service: selectedService, onClose: () => setSelectedService(null) })] }));
};
export default ServiceList;
