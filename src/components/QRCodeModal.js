import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Download } from "lucide-react";
import { toast } from "sonner";
export function QRCodeModal({ isOpen, onClose, purchaseId }) {
    const handleDownload = () => {
        console.log('Downloading QR code for purchase:', purchaseId);
        toast.success("QR Code downloaded successfully");
    };
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 min-h-full w-full bg-black/50 backdrop-blur-sm z-40" }), _jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-full max-w-md", children: [_jsx("h2", { className: "text-center text-xl font-semibold", children: "Purchase QR Code" }), _jsxs("div", { className: "flex flex-col items-center space-y-6 py-4", children: [_jsx("div", { className: "bg-white p-4 rounded-lg shadow-sm border", children: _jsx("div", { className: "w-64 h-64 bg-gray-100 rounded-lg animate-pulse" }) }), _jsx("p", { className: "text-center text-gray-600 max-w-xs", children: "Show this code to the professional to validate your purchase" }), _jsxs("button", { onClick: handleDownload, className: "w-full sm:w-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download QR Code"] }), _jsx("button", { onClick: onClose, className: "mt-2 text-gray-600 hover:text-gray-800", children: "Close" })] })] }) }) })] }));
}
