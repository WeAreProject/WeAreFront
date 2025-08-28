import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, List } from "lucide-react";
export const ViewToggle = ({ isGrid, onToggle }) => {
    return (_jsxs("div", { className: "flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200", children: [_jsx("button", { onClick: onToggle, className: `p-2 rounded-md transition-all duration-200 ${isGrid ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"}`, children: _jsx(Grid, { size: 20 }) }), _jsx("button", { onClick: onToggle, className: `p-2 rounded-md transition-all duration-200 ${!isGrid ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"}`, children: _jsx(List, { size: 20 }) })] }));
};
