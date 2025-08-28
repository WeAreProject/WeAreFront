import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X } from "lucide-react";
const CreateServiceModal = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: 0,
        thumbnail: null,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.thumbnail)
            return;
        onSubmit(formData);
        setFormData({
            name: "",
            category: "",
            description: "",
            price: 0,
            thumbnail: null,
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, thumbnail: file }));
        }
    };
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md shadow-xl", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Create New Service" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Service Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Category" }), _jsx("input", { type: "text", value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm", rows: 3, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Price" }), _jsx("input", { type: "number", value: formData.price, onChange: (e) => setFormData({ ...formData, price: parseFloat(e.target.value) }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Image" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleImageChange, className: "mt-1 block w-full text-sm text-gray-500\r\n                file:mr-4 file:py-2 file:px-4\r\n                file:rounded-md file:border-0\r\n                file:text-sm file:font-semibold\r\n                file:bg-black file:text-white\r\n                hover:file:bg-gray-800", required: true })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black", children: "Create Service" })] })] })] }) }));
};
export default CreateServiceModal;
