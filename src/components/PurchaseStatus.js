import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const statusConfig = {
    pending: {
        color: "bg-status-pending",
        text: "Pending",
    },
    completed: {
        color: "bg-status-completed",
        text: "Completed",
    },
    canceled: {
        color: "bg-status-canceled",
        text: "Canceled",
    },
};
export function PurchaseStatus({ status }) {
    const config = statusConfig[status];
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `h-2 w-2 rounded-full animate-pulse ${config.color}` }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: config.text })] }));
}
