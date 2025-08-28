import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export const FilterSort = () => {
    const [selectedValue, setSelectedValue] = useState("popular");
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable
    return (_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "relative w-[180px]", children: [_jsxs("button", { className: "w-full flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-2 border border-gray-300 rounded-md", onClick: () => setIsOpen(!isOpen), children: [_jsxs("span", { children: [selectedValue === "popular" && "Most Popular", selectedValue === "newest" && "Newest", selectedValue === "nearby" && "Nearby"] }), _jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}` })] }), isOpen && (_jsxs("div", { className: "absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-10", children: [_jsx("button", { className: "block w-full text-left px-4 py-2 hover:bg-gray-100", onClick: () => {
                                setSelectedValue("popular");
                                setIsOpen(false);
                            }, children: "Most Popular" }), _jsx("button", { className: "block w-full text-left px-4 py-2 hover:bg-gray-100", onClick: () => {
                                setSelectedValue("newest");
                                setIsOpen(false);
                            }, children: "Newest" }), _jsx("button", { className: "block w-full text-left px-4 py-2 hover:bg-gray-100", onClick: () => {
                                setSelectedValue("nearby");
                                setIsOpen(false);
                            }, children: "Nearby" })] }))] }) }));
};
