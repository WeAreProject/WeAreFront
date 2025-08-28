import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, MoreVertical, Pencil, Trash, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
const MyServiceCard = ({ service, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [imageUrl, setImageUrl] = useState(undefined);
    useEffect(() => {
        if (service.thumbnail === null) {
            setImageUrl(undefined);
            return;
        }
        if (typeof service.thumbnail === 'string') {
            setImageUrl(service.thumbnail);
            return;
        }
        const url = URL.createObjectURL(service.thumbnail);
        setImageUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [service.thumbnail]);
    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            onDelete(service.id);
            toast.success("Service deleted successfully");
        }, 300);
    };
    return (_jsxs("div", { className: `relative bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${isDeleting ? "scale-95 opacity-0" : ""}`, children: [_jsx("div", { className: "relative h-48", children: imageUrl ? (_jsx("img", { src: imageUrl, alt: service.name, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gray-100 flex items-center justify-center", children: _jsx(Image, { className: "h-12 w-12 text-gray-400" }) })) }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${service.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-700"}`, children: service.status.charAt(0).toUpperCase() + service.status.slice(1) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: service.name }), _jsx("p", { className: "text-sm text-gray-500 capitalize", children: service.category })] }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-2 rounded-full hover:bg-gray-100 transition-colors", children: _jsx(MoreVertical, { className: "h-4 w-4 text-gray-500" }) }), showMenu && (_jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10 border border-gray-100", children: [_jsxs("button", { className: "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "Preview"] }), _jsxs("button", { className: "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50", children: [_jsx(Pencil, { className: "mr-2 h-4 w-4" }), "Edit"] }), _jsxs("button", { onClick: handleDelete, className: "flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50", children: [_jsx(Trash, { className: "mr-2 h-4 w-4" }), "Delete"] })] }))] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "aspect-square h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden", children: _jsx("img", { src: imageUrl || "/placeholder.svg", alt: service.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-2xl font-bold text-gray-900", children: ["$", service.price] }), _jsx("p", { className: "text-sm text-gray-500", children: "per session" })] })] }), _jsx("div", { className: "flex items-center justify-between pt-4 border-t border-gray-100", children: _jsxs("div", { className: "text-sm text-gray-500", children: [service.bookings, " bookings"] }) })] })] }));
};
export default MyServiceCard;
