import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { FaUser, FaBell, FaLock, FaHeadset, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
const SettingsSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: "fixed top-24 left-0 z-50 lg:hidden bg-white rounded-r-lg p-2 shadow-md", children: isOpen ? _jsx(FaChevronLeft, { className: "text-gray-600" }) : _jsx(FaChevronRight, { className: "text-gray-600" }) }), isOpen && (_jsx("div", { className: "fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-40 lg:hidden", onClick: () => setIsOpen(false) })), _jsxs("div", { className: `
        fixed lg:relative w-64 bg-white rounded-lg p-4 h-fit mt-20 z-40
        transition-transform duration-300 ease-in-out shadow-lg
        lg:transform-none lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `, children: [_jsxs(NavLink, { to: "/profile-settings", className: ({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`, onClick: () => setIsOpen(false), children: [_jsx(FaUser, { className: "mr-3" }), " Profile"] }), _jsxs(NavLink, { to: "/notification-settings", className: ({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`, onClick: () => setIsOpen(false), children: [_jsx(FaBell, { className: "mr-3" }), " Notifications"] }), _jsxs(NavLink, { to: "/security-settings", className: ({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`, onClick: () => setIsOpen(false), children: [_jsx(FaLock, { className: "mr-3" }), " Security"] }), _jsxs(NavLink, { to: "/support-settings", className: ({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`, onClick: () => setIsOpen(false), children: [_jsx(FaHeadset, { className: "mr-3" }), " Support"] })] })] }));
};
export default SettingsSidebar;
