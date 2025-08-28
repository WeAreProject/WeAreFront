import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Gift, Trash2, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import { getCustomerPurchases } from "../actions/purchases";
import BottomNav from "../components/BottomNav";
const statusLabels = {
    pending: "Pendiente",
    completed: "Completado",
    canceled: "Cancelado",
    thanked: "Gracias por su compra",
};
const statusColors = {
    pending: "bg-yellow-400",
    completed: "bg-green-500",
    canceled: "bg-red-500",
    thanked: "bg-blue-500",
};
const LOCAL_STORAGE_KEY = "user_purchases";
const Mypurchases = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const userDataString = localStorage.getItem("user");
                if (!userDataString) {
                    setError("No se encontró la información del usuario");
                    setLoading(false);
                    return;
                }
                const userData = JSON.parse(userDataString);
                const customerId = userData.id;
                if (!customerId) {
                    setError("No se encontró el ID del cliente en la información del usuario");
                    setLoading(false);
                    return;
                }
                const savedPurchases = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (savedPurchases) {
                    const purchasesFromStorage = JSON.parse(savedPurchases).map((p) => ({
                        ...p,
                        service: {
                            ...p.service,
                            image: p.service?.image || "/default-service.jpg",
                        },
                    }));
                    setPurchases(purchasesFromStorage);
                    setLoading(false);
                    return;
                }
                const purchasesData = await getCustomerPurchases(customerId);
                const purchasesWithImages = purchasesData.map((p) => ({
                    ...p,
                    service: {
                        ...p.service,
                        image: p.service?.image || "/default-service.jpg",
                    },
                }));
                setPurchases(purchasesWithImages);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(purchasesWithImages));
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            }
            finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, []);
    const handleDeletePurchase = (id) => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta compra?");
        if (!confirmDelete)
            return;
        const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
        setPurchases(updatedPurchases);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPurchases));
    };
    const handleCompletePurchase = (id) => {
        const updatedPurchases = purchases.map(purchase => {
            if (purchase.id === id) {
                return { ...purchase, status: "thanked" };
            }
            return purchase;
        });
        setPurchases(updatedPurchases);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPurchases));
    };
    const filteredPurchases = purchases.filter((purchase) => {
        const serviceName = purchase.service?.service_name.toLowerCase() || "";
        const matchesSearch = serviceName.includes(search.toLowerCase()) ||
            purchase.service_id.toString().includes(search);
        const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const uniquePurchases = filteredPurchases.filter((purchase, index, self) => index === self.findIndex((p) => p.id === purchase.id));
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white", children: [_jsx(Header, {}), _jsx("main", { className: "container mx-auto px-4 pb-24 pt-20", children: _jsxs("div", { className: "max-w-md mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsxs("h1", { className: "text-3xl font-bold flex justify-center items-center gap-2", children: ["\uD83D\uDED2 ", _jsx("span", { children: "Mis Compras" })] }), _jsx("p", { className: "text-sm text-white/60", children: "Ver y gestionar tu historial de compras" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "text", placeholder: "Buscar compras...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" }) }), _jsxs("div", { className: "w-full", children: [_jsx("label", { htmlFor: "statusFilter", className: "sr-only", children: "Filtrar por estado" }), _jsxs("select", { id: "statusFilter", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "all", children: "Todos los estados" }), _jsx("option", { value: "pending", children: "Pendiente" }), _jsx("option", { value: "completed", children: "Completado" }), _jsx("option", { value: "canceled", children: "Cancelado" }), _jsx("option", { value: "thanked", children: "Gracias por su compra" })] })] })] }), loading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("p", { className: "text-white/50", children: "Cargando compras..." }) })) : error ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("p", { className: "text-red-400", children: error }) })) : uniquePurchases.length === 0 ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("p", { className: "text-white/40", children: "No se encontraron compras" }) })) : (_jsx("div", { className: "space-y-4", children: uniquePurchases.map((purchase) => (_jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl hover:scale-[1.01] transition-all duration-200", children: [purchase.service?.image && (_jsx("img", { src: purchase.service.image, alt: purchase.service.service_name, className: "w-full h-40 object-cover rounded-xl border border-white/10 mb-3", loading: "lazy" })), _jsxs("div", { className: "mb-3", children: [_jsx("h3", { className: "text-lg font-bold text-white", children: purchase.service?.service_name || "Servicio desconocido" }), _jsx("p", { className: "text-sm text-white/60", children: purchase.business?.business_name || "Negocio no encontrado" })] }), _jsxs("div", { className: "flex items-center justify-between text-sm text-white/70 mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${statusColors[purchase.status]}` }), _jsx("span", { children: statusLabels[purchase.status] })] }), _jsx("span", { children: new Date(purchase.purchase_date).toLocaleDateString() }), _jsxs("span", { className: "text-white font-semibold", children: ["$", parseFloat(purchase.price).toFixed(2)] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition text-sm font-semibold shadow", children: [_jsx(Gift, { className: "w-4 h-4" }), "\u00A1Cashback obtenido!"] }), _jsxs("button", { onClick: () => handleDeletePurchase(purchase.id), className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition text-sm font-semibold shadow", children: [_jsx(Trash2, { className: "w-4 h-4" }), "Eliminar"] })] }), purchase.status === "pending" && (_jsxs("button", { onClick: () => handleCompletePurchase(purchase.id), className: "w-full flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl transition text-sm font-semibold shadow mt-2", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), "Terminar compra"] }))] })] }, purchase.id))) }))] }) }), _jsx(BottomNav, {})] }));
};
export default Mypurchases;
