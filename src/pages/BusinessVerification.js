import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const BusinessVerification = ({ prevStep, nextStep }) => {
    const [formData, setFormData] = useState({
        taxID: "",
        document: null,
        previewDocument: "",
        termsAccepted: false
    });
    const [progress, setProgress] = useState(75);
    const [isComplete, setIsComplete] = useState(false);
    useEffect(() => {
        const isValidTaxID = formData.taxID.trim().length > 0;
        const hasDocument = formData.document !== null;
        const acceptedTerms = formData.termsAccepted;
        if (isValidTaxID && hasDocument && acceptedTerms) {
            setProgress(100);
            setIsComplete(true);
        }
        else {
            setProgress(75);
            setIsComplete(false);
        }
    }, [formData]);
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFormData({ ...formData, document: file, previewDocument: URL.createObjectURL(file) });
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8", children: _jsxs("div", { className: "bg-white p-10 sm:p-12 md:p-16 rounded-2xl shadow-lg w-full max-w-4xl", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6", children: "Register Your Business" }), _jsx("p", { className: "text-gray-600 text-center mb-8", children: "Complete the form below to register your business" }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-3 mb-8", children: _jsx("div", { className: "bg-purple-600 h-3 rounded-full transition-all duration-300", style: { width: `${progress}%` } }) }), _jsxs("form", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xl font-medium text-gray-700", children: "Tax ID (RFC)" }), _jsx("input", { type: "text", name: "taxID", value: formData.taxID, onChange: handleChange, className: "w-full px-5 py-4 border rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 text-xl", placeholder: "Enter your tax ID", required: true }), !formData.taxID && _jsx("p", { className: "text-red-500 text-sm mt-2", children: "Tax ID is required" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xl font-medium text-gray-700", children: "Professional License/Certification" }), formData.previewDocument ? (_jsxs("div", { className: "mt-4 flex flex-col items-center", children: [_jsx("embed", { src: formData.previewDocument, className: "w-full h-48 object-cover rounded-lg shadow" }), _jsx("button", { type: "button", onClick: () => setFormData({ ...formData, document: null, previewDocument: "" }), className: "mt-2 text-red-500 text-sm hover:underline", children: "Remove document" })] })) : (_jsxs("div", { className: "mt-4 w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition", children: [_jsx("input", { type: "file", accept: "application/pdf,image/*", onChange: handleFileChange, className: "hidden", id: "file-upload" }), _jsxs("label", { htmlFor: "file-upload", className: "flex flex-col items-center cursor-pointer", children: [_jsx("div", { className: "text-4xl text-gray-500", children: "\uD83D\uDCC2" }), _jsx("span", { className: "text-gray-500 text-xl", children: "Drag and drop an image, or click to select" })] })] }))] }), _jsxs("div", { className: "flex items-start", children: [_jsx("input", { type: "checkbox", name: "termsAccepted", checked: formData.termsAccepted, onChange: handleChange, className: "w-6 h-6 mt-1" }), _jsx("label", { className: "ml-4 text-lg text-gray-700", children: "I agree to the terms and conditions" })] }), !formData.termsAccepted && _jsx("p", { className: "text-red-500 text-sm mt-2", children: "You must accept the terms and conditions" }), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx("button", { type: "button", onClick: prevStep, className: "bg-gray-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition w-full sm:w-auto", children: "Previous" }), _jsx("button", { type: "button", onClick: isComplete ? nextStep : undefined, className: `py-4 px-8 rounded-lg font-semibold transition w-full sm:w-auto ${isComplete ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, disabled: !isComplete, children: "Submit & Verify" })] })] })] }) }));
};
export default BusinessVerification;
