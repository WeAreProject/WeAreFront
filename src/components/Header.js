import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu, X, Home, Grid, ShoppingBag, CreditCard, Users, Briefcase, LayoutDashboard, Megaphone, Sun, Settings, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserRole(user.role || user.type || null);
            }
            catch (e) {
                console.error("Error parsing user", e);
            }
        }
    }, []);
    const isActive = (path) => location.pathname === path
        ? "bg-red-700 text-white"
        : "hover:bg-gray-200";
    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        setIsOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "fixed top-0 left-0 w-full h-16 bg-white text-black z-50 shadow-sm flex items-center justify-between px-4", children: [_jsx("button", { onClick: () => setIsOpen(true), className: "focus:outline-none", children: _jsx(Menu, { className: "w-6 h-6" }) }), _jsx("div", { className: "flex-1 px-2 max-w-md mx-auto block", children: _jsx(SearchBar, { placeholder: "Buscar servicios...", onSearch: (query) => {
                                localStorage.setItem("search_query", query);
                                window.dispatchEvent(new Event("searchQueryUpdated"));
                            } }) }), _jsx("button", { onClick: () => navigate("/"), className: "focus:outline-none", children: _jsx("img", { src: "/images/category-icons/WRE.png", alt: "Logo", className: "h-10 w-auto object-contain" }) })] }), _jsx("div", { className: `fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`, onClick: () => setIsOpen(false) }), _jsxs("nav", { className: `fixed top-0 left-0 h-screen w-64 bg-white text-black p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-[60] overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"}`, children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-xl font-bold", children: "We Are" }), _jsx("button", { onClick: () => setIsOpen(false), children: _jsx(X, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "mb-auto", children: [_jsx("p", { className: "text-gray-500 uppercase text-sm font-semibold mb-2", children: "Main Menu" }), _jsxs("button", { onClick: () => handleNavigation("/"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/")}`, children: [_jsx(Home, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Home" })] }), _jsxs("button", { onClick: () => handleNavigation("/categories"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/categories")}`, children: [_jsx(Grid, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Categories" })] }), _jsxs("button", { onClick: () => handleNavigation("/mypurchases"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/mypurchases")}`, children: [_jsx(ShoppingBag, { className: "w-5 h-5" }), " ", _jsx("span", { children: "My purchases" })] }), _jsxs("button", { onClick: () => handleNavigation("/payment-methods"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/payment-methods")}`, children: [_jsx(CreditCard, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Payment Methods" })] }), _jsxs("button", { onClick: () => handleNavigation("/refer"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/refer")}`, children: [_jsx(Users, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Refer" })] })] }), userRole === "owner" && (_jsxs("div", { className: "mb-auto mt-4", children: [_jsx("p", { className: "text-gray-500 uppercase text-sm font-semibold mb-2", children: "My Services" }), _jsxs("button", { onClick: () => handleNavigation("/MyServices"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/MyServices")}`, children: [_jsx(Briefcase, { className: "w-5 h-5" }), " ", _jsx("span", { children: "My Services" })] }), _jsxs("button", { onClick: () => handleNavigation("/ServiceDashboard"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/ServiceDashboard")}`, children: [_jsx(LayoutDashboard, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Service Dashboard" })] }), _jsxs("button", { onClick: () => handleNavigation("/ads"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/ads")}`, children: [_jsx(Megaphone, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Ads & Promotions" })] }), _jsxs("button", { onClick: () => handleNavigation("/Negocio"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/Negocio")}`, children: [_jsx(Briefcase, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Negocio" })] }), _jsxs("button", { onClick: () => handleNavigation("/profile"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/profile")}`, children: [_jsx(User, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Profile" })] })] })), _jsxs("div", { className: "mt-6", children: [_jsx("p", { className: "text-gray-500 uppercase text-sm font-semibold mb-2", children: "Settings" }), _jsxs("button", { className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/light-mode")}`, children: [_jsx(Sun, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Light Mode" })] }), _jsxs("button", { onClick: () => handleNavigation("/profile-settings"), className: `flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/profile-settings")}`, children: [_jsx(Settings, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Profile Settings" })] }), _jsxs("button", { onClick: handleLogout, className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 text-red-500 w-full text-left", children: [_jsx(LogOut, { className: "w-5 h-5" }), " ", _jsx("span", { children: "Logout" })] })] })] })] })] }));
};
export default Header;
