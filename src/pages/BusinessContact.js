import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const BusinessContact = ({ prevStep, nextStep }) => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        businessLogo: null,
        previewLogo: ""
    });
    const [progress, setProgress] = useState(25);
    const [isComplete, setIsComplete] = useState(false);
    useEffect(() => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const isValidPhone = /^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/.test(formData.phone);
        const hasLogo = formData.businessLogo !== null;
        if (isValidEmail && isValidPhone && hasLogo) {
            setProgress(50);
            setIsComplete(true);
        }
        else {
            setProgress(25);
            setIsComplete(false);
        }
    }, [formData.email, formData.phone, formData.businessLogo]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFormData({
                ...formData,
                businessLogo: file,
                previewLogo: URL.createObjectURL(file)
            });
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 px-6", children: _jsxs("div", { className: "bg-white p-12 rounded-3xl shadow-2xl w-full max-w-3xl lg:max-w-4xl", children: [_jsx("h2", { className: "text-3xl font-bold text-center text-gray-900", children: "Register your business" }), _jsx("p", { className: "text-gray-600 text-center mb-8 text-lg", children: "Complete the form to register your business" }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-3 mb-8", children: _jsx("div", { className: "bg-purple-600 h-3 rounded-full transition-all duration-300", style: { width: `${progress}%` } }) }), _jsxs("form", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-semibold text-lg", children: "Business Logo" }), formData.previewLogo ? (_jsxs("div", { className: "mt-4 flex flex-col items-center", children: [_jsx("img", { src: formData.previewLogo, alt: "Business Logo", className: "w-40 h-40 object-cover rounded-xl shadow-lg" }), _jsx("button", { type: "button", onClick: () => setFormData({ ...formData, businessLogo: null, previewLogo: "" }), className: "mt-3 text-red-500 text-sm hover:underline", children: "Remove image" })] })) : (_jsxs("div", { className: "mt-4 w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-purple-500 transition", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden", id: "file-upload" }), _jsxs("label", { htmlFor: "file-upload", className: "flex flex-col items-center cursor-pointer", children: [_jsx("div", { className: "text-gray-500 text-3xl", children: "\u2B06\uFE0F" }), _jsx("span", { className: "text-gray-500 text-lg", children: "Drag an image or click to select" })] })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-semibold text-lg", children: "Email Address" }), _jsxs("div", { className: "relative mt-3", children: [_jsx("span", { className: "absolute left-4 top-4 text-gray-500 text-xl", children: "\u2709\uFE0F" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "pl-12 w-full px-5 py-4 border rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-purple-500", placeholder: "Enter your email", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-semibold text-lg", children: "Phone Number" }), _jsxs("div", { className: "relative mt-3", children: [_jsx("span", { className: "absolute left-4 top-4 text-gray-500 text-xl", children: "\uD83D\uDCDE" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleChange, className: "pl-12 w-full px-5 py-4 border rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-purple-500", placeholder: "Enter your phone number", required: true })] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { type: "button", onClick: prevStep, className: "bg-gray-500 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-600 transition", children: "Previous" }), _jsx("button", { type: "button", onClick: nextStep, className: `py-4 px-8 rounded-xl text-lg font-semibold transition ${isComplete ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, disabled: !isComplete, children: "Next" })] })] })] }) }));
};
export default BusinessContact;
