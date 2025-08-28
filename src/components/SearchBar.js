import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SearchBar = ({ placeholder = "Buscar...", onSearch, className = "", value = "" // ✅ desestructurado con valor por defecto
 }) => {
    const handleChange = (e) => {
        onSearch(e.target.value);
    };
    return (_jsx("div", { className: `relative w-full max-w-xl mx-auto ${className}`, children: _jsxs("div", { className: "relative group", children: [_jsx("input", { type: "text", placeholder: placeholder, onChange: handleChange, value: value, className: "w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300" }), _jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors duration-200", size: 20 })] }) }));
};
