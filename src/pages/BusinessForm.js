import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const BusinessForm = ({ nextStep }) => {
    const [formData, setFormData] = useState({
        businessName: "",
        category: "",
        description: "",
    });
    const categories = [
        "Health", "House repairs", "Product market", "Technology",
        "Education", "Entertainment", "Financial services", "Beauty",
        "Car repair", "Maintenance", "Others",
    ];
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
    const progress = allFieldsFilled ? 25 : 0;
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 px-4", children: _jsxs("div", { className: "bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl lg:w-3/4", children: [_jsx("h2", { className: "text-4xl font-bold text-center text-gray-900", children: "Register Your Business" }), _jsx("p", { className: "text-gray-600 text-center mb-8 text-lg", children: "Complete the form below to register your business" }), _jsx("div", { className: "w-full bg-gray-300 rounded-full h-4 mb-8", children: _jsx("div", { className: "bg-purple-600 h-4 rounded-full transition-all duration-300", style: { width: `${progress}%` } }) }), _jsxs("form", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-800 font-semibold text-lg", children: "Business Name" }), _jsx("input", { type: "text", name: "businessName", value: formData.businessName, onChange: handleChange, className: "mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-800 font-semibold text-lg", children: "Category" }), _jsxs("select", { name: "category", value: formData.category, onChange: handleChange, className: "mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition", required: true, children: [_jsx("option", { value: "", children: "Select a category" }), categories.map(category => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-800 font-semibold text-lg", children: "Business Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, maxLength: 500, rows: 5, className: "mt-2 w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition", required: true }), _jsxs("p", { className: "text-right text-gray-500 text-sm", children: [formData.description.length, " / 500 characters"] })] }), _jsx("button", { type: "button", className: "w-full bg-purple-700 text-white py-4 rounded-lg text-xl font-semibold hover:bg-purple-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed", onClick: nextStep, disabled: !allFieldsFilled, children: "Next" })] })] }) }));
};
export default BusinessForm;
