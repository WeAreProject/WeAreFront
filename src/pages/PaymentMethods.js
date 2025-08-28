import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CreditCard, Trash2, X, PlusCircle } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
const PaymentMethods = () => {
    const location = useLocation();
    const serviceName = location.state?.serviceName || null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });
    const [paymentMethods, setPaymentMethods] = useState([
        { id: "1", last4: "4242", expiryDate: "12/24", isDefault: true },
        { id: "2", last4: "1234", expiryDate: "08/25", isDefault: false },
    ]);
    const [transactions, setTransactions] = useState([
        {
            id: "1",
            amount: 48.99,
            description: "Suscripción mensual",
            date: "3/10/2024",
            status: "completed",
        },
        {
            id: "2",
            amount: 48.99,
            description: "Suscripción mensual",
            date: "2/10/2024",
            status: "completed",
        },
    ]);
    const handleSetDefault = (id) => {
        setPaymentMethods((methods) => methods.map((method) => ({
            ...method,
            isDefault: method.id === id,
        })));
    };
    const handleDelete = (id) => {
        setPaymentMethods((methods) => methods.filter((method) => method.id !== id));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === "cardNumber") {
            formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
            formattedValue = formattedValue.substring(0, 19);
        }
        if (name === "expiryDate") {
            formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length >= 2) {
                formattedValue =
                    formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4);
            }
            formattedValue = formattedValue.substring(0, 5);
        }
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").substring(0, 4);
        }
        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const last4 = formData.cardNumber.replace(/\s/g, "").slice(-4);
        const newPaymentMethod = {
            id: Date.now().toString(),
            last4,
            expiryDate: formData.expiryDate,
            isDefault: paymentMethods.length === 0,
        };
        setPaymentMethods((prev) => [...prev, newPaymentMethod]);
        setIsModalOpen(false);
        setFormData({
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white", children: [_jsx(Header, {}), _jsxs("div", { className: "pt-24 px-6 text-center", children: [_jsx("h1", { className: "text-4xl font-extrabold mb-2", children: "M\u00E9todos de Pago" }), _jsx("p", { className: "text-white/70", children: "Administra tus tarjetas y transacciones" })] }), serviceName && (_jsxs("div", { className: "bg-yellow-400/20 text-yellow-300 p-4 mt-6 mx-4 rounded-xl text-center font-semibold", children: ["Est\u00E1s comprando el servicio: ", _jsx("span", { className: "text-white", children: serviceName }), _jsx("div", { className: "mt-3", children: _jsx("button", { className: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition", children: "Pagar ahora" }) })] })), _jsxs("main", { className: "max-w-md mx-auto px-4 pt-8 pb-24 space-y-6", children: [_jsxs("section", { className: "bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Tus m\u00E9todos de pago" }), _jsx("div", { className: "space-y-4", children: paymentMethods.map((method) => (_jsxs("div", { className: "flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/20", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", checked: method.isDefault, onChange: () => handleSetDefault(method.id), className: "accent-cyan-500" }), _jsx(CreditCard, { className: "w-6 h-6 text-cyan-400" }), _jsxs("div", { children: [_jsxs("p", { className: "font-semibold text-white text-sm", children: ["\u2022\u2022\u2022\u2022 ", method.last4] }), _jsxs("p", { className: "text-xs text-white/60", children: ["Expira ", method.expiryDate] })] })] }), _jsx("button", { onClick: () => handleDelete(method.id), className: "text-red-400 hover:text-red-500 transition", children: _jsx(Trash2, { className: "w-5 h-5" }) })] }, method.id))) })] }), _jsxs("section", { className: "bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg", children: [_jsx("h3", { className: "text-lg font-bold mb-3", children: "Transacciones recientes" }), transactions.map((transaction) => (_jsxs("div", { className: "flex justify-between items-center bg-white/5 rounded-xl p-4 mb-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xl font-semibold text-green-300", children: ["$", transaction.amount.toFixed(2)] }), _jsx("p", { className: "text-sm text-white/80", children: transaction.description }), _jsx("p", { className: "text-xs text-white/50", children: transaction.date })] }), _jsx("span", { className: "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold", children: "Completado" })] }, transaction.id)))] })] }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "fixed bottom-24 right-6 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-xl transition", children: _jsx(PlusCircle, { className: "w-6 h-6" }) }), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4", children: _jsxs("div", { className: "bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl", children: [_jsx("button", { onClick: () => setIsModalOpen(false), className: "absolute top-4 right-4 text-white/60 hover:text-white", children: _jsx(X, { className: "w-6 h-6" }) }), _jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "A\u00F1adir tarjeta" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", name: "cardNumber", value: formData.cardNumber, onChange: handleInputChange, placeholder: "1234 5678 9012 3456", className: "w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400", required: true }), _jsx("input", { type: "text", name: "cardHolder", value: formData.cardHolder, onChange: handleInputChange, placeholder: "Nombre del titular", className: "w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400", required: true }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", name: "expiryDate", value: formData.expiryDate, onChange: handleInputChange, placeholder: "MM/AA", className: "w-1/2 p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400", required: true }), _jsx("input", { type: "text", name: "cvv", value: formData.cvv, onChange: handleInputChange, placeholder: "CVV", className: "w-1/2 p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white focus:ring-2 focus:ring-cyan-400", required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition", children: "Guardar tarjeta" })] })] }) })), _jsx(BottomNav, {})] }));
};
export default PaymentMethods;
