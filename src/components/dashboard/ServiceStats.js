import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { DollarSign, Users, CheckCircle, Star } from "lucide-react";
import { getPurchasesByBusinessId, getBusinessByOwnerId } from "../../actions/services";
import { getReviewsByBusinessId, calculateAverageRating } from "../../actions/reviews";
const ServiceStats = () => {
    const [stats, setStats] = useState({
        totalEarnings: 0,
        activeClients: 0,
        completedServices: 0,
        averageRating: 0,
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user") || "{}");
                if (!userData.id)
                    return;
                const businesses = await getBusinessByOwnerId(userData.id);
                if (!businesses || businesses.length === 0)
                    return;
                const businessId = businesses[0].id;
                const purchases = await getPurchasesByBusinessId(businessId);
                const reviews = await getReviewsByBusinessId(businessId);
                const totalEarnings = purchases.reduce((acc, purchase) => acc + parseFloat(purchase.price), 0);
                const uniqueClients = new Set(purchases.map(p => p.customer_id)).size;
                const completedServices = purchases.filter(p => p.status === "completed").length;
                const averageRating = calculateAverageRating(reviews);
                setStats({
                    totalEarnings,
                    activeClients: uniqueClients,
                    completedServices,
                    averageRating,
                });
            }
            catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);
    return (_jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-up", children: [_jsxs("div", { className: "p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105", children: [_jsxs("div", { className: "flex flex-row items-center justify-between pb-2", children: [_jsx("h2", { className: "text-sm font-medium", children: "Total Earnings" }), _jsx(DollarSign, { className: "h-4 w-4 text-primary" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold", children: ["$", stats.totalEarnings.toFixed(2)] }), _jsx("p", { className: "text-xs text-gray-500", children: "Total earnings from all services" })] })] }), _jsxs("div", { className: "p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105", children: [_jsxs("div", { className: "flex flex-row items-center justify-between pb-2", children: [_jsx("h2", { className: "text-sm font-medium", children: "Active Clients" }), _jsx(Users, { className: "h-4 w-4 text-primary" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.activeClients }), _jsx("p", { className: "text-xs text-gray-500", children: "Unique clients this month" })] })] }), _jsxs("div", { className: "p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105", children: [_jsxs("div", { className: "flex flex-row items-center justify-between pb-2", children: [_jsx("h2", { className: "text-sm font-medium", children: "Completed Services" }), _jsx(CheckCircle, { className: "h-4 w-4 text-primary" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.completedServices }), _jsx("p", { className: "text-xs text-gray-500", children: "Total completed services" })] })] }), _jsxs("div", { className: "p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105", children: [_jsxs("div", { className: "flex flex-row items-center justify-between pb-2", children: [_jsx("h2", { className: "text-sm font-medium", children: "Average Rating" }), _jsx(Star, { className: "h-4 w-4 text-primary" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.averageRating }), _jsx("p", { className: "text-xs text-gray-500", children: "Based on client feedback" })] })] })] }));
};
export default ServiceStats;
