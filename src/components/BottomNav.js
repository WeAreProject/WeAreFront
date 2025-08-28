import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, ShoppingBag, User, MessageSquare, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [counts, setCounts] = useState({
        purchases: 0,
        messages: 0,
        appointments: 0
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const isActive = (path) => location.pathname === path
        ? "text-red-700 font-semibold"
        : "text-gray-500 hover:text-red-600";
    const updateCountsAndTotal = useCallback(() => {
        try {
            const purchases = JSON.parse(localStorage.getItem("user_purchases") || "[]");
            const appointments = JSON.parse(localStorage.getItem("user_appointments") || "[]");
            const messages = JSON.parse(localStorage.getItem("user_messages") || "[]");
            const calculatedTotal = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.price || "0"), 0);
            setCounts({
                purchases: purchases.length,
                messages: messages.filter(msg => !msg.read).length,
                appointments: appointments.filter(a => !a.viewed).length
            });
            setTotalAmount(calculatedTotal);
        }
        catch (error) {
            console.error("Error updating counts:", error);
        }
    }, []);
    useEffect(() => {
        updateCountsAndTotal();
        const handleStorageUpdate = () => {
            updateCountsAndTotal();
        };
        window.addEventListener("storage", handleStorageUpdate);
        window.addEventListener("localStorageChange", handleStorageUpdate);
        return () => {
            window.removeEventListener("storage", handleStorageUpdate);
            window.removeEventListener("localStorageChange", handleStorageUpdate);
        };
    }, [updateCountsAndTotal]);
    return (_jsxs("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 z-50", children: [_jsxs("button", { onClick: () => navigate("/"), className: `flex flex-col items-center ${isActive("/")}`, "aria-label": "Inicio", children: [_jsx(Home, { className: "w-5 h-5 mb-1" }), _jsx("span", { className: "text-xs", children: "Inicio" })] }), _jsxs("button", { onClick: () => navigate("/mypurchases"), className: `relative flex flex-col items-center ${isActive("/mypurchases")}`, "aria-label": "Compras", children: [_jsx(ShoppingBag, { className: "w-5 h-5 mb-1" }), _jsx("span", { className: "text-xs", children: "Compras" }), counts.purchases > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 text-white text-[10px] font-bold bg-red-500 rounded-full w-4 h-4 flex items-center justify-center border border-white", children: counts.purchases > 9 ? "9+" : counts.purchases }))] }), _jsxs("button", { onClick: () => navigate("/chatlist"), className: `relative flex flex-col items-center ${isActive("/chatlist")}`, "aria-label": "Mensajes", children: [_jsx(MessageSquare, { className: "w-5 h-5 mb-1" }), _jsx("span", { className: "text-xs", children: "Mensajes" }), counts.messages > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 text-white text-[10px] font-bold bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border border-white", children: counts.messages > 9 ? "9+" : counts.messages }))] }), _jsxs("button", { onClick: () => navigate("/notifications"), className: `relative flex flex-col items-center ${isActive("/notifications")}`, "aria-label": "Notificaciones", children: [_jsx(Bell, { className: "w-5 h-5 mb-1" }), _jsx("span", { className: "text-xs", children: "Notificaciones" }), counts.appointments > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 text-white text-[10px] font-bold bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center border border-white", children: counts.appointments > 9 ? "9+" : counts.appointments }))] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("button", { onClick: () => navigate("/profile-settings"), className: `flex flex-col items-center ${isActive("/profile-settings")}`, "aria-label": "Perfil", children: [_jsx(User, { className: "w-5 h-5 mb-1" }), _jsx("span", { className: "text-xs", children: "Perfil" })] }), _jsxs("div", { className: "text-xs text-red-700 font-medium", children: ["$", totalAmount.toFixed(0)] })] })] }));
};
export default BottomNav;
