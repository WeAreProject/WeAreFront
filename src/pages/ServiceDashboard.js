import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ServiceStats from "../components/dashboard/ServiceStats";
import ServiceTabs from "../components/dashboard/ServiceTabs";
import Header from "../components/Header";
const ServiceDashboard = () => {
    return (_jsxs("div", { className: "container mx-auto py-8 px-4 space-y-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-16", children: [_jsx(Header, {}), _jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Service Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your services and track performance" })] }), _jsx(ServiceStats, {}), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold tracking-tight", children: "Services Overview" }), _jsx(ServiceTabs, {})] })] }));
};
export default ServiceDashboard;
