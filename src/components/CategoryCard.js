import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export const CategoryCard = ({ title, description, icon, featured }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/categories/${title.toLowerCase()}`);
    };
    const handleBuyClick = (e) => {
        e.stopPropagation(); // Evita que se active handleClick
        navigate("/payment-methods", {
            state: { serviceName: title },
        });
    };
    const imagePath = `/imagenes/${icon}`;
    return (_jsxs(motion.div, { onClick: handleClick, whileHover: { y: -5 }, role: "button", tabIndex: 0, className: `relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${featured ? "ring-2 ring-primary-500 bg-primary-50" : ""}`, children: [featured && (_jsx("span", { className: "absolute top-3 right-3 text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full", children: "Destacado" })), _jsx("div", { className: "w-12 h-12 mb-4 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden", children: _jsx("img", { src: imagePath, alt: title, className: "w-full h-full object-cover", onError: (e) => {
                        e.target.src = "/imagenes/default-category.png";
                    } }) }), _jsx("h3", { className: "text-lg font-medium mb-2", children: title }), _jsx("p", { className: "text-sm text-gray-600", children: description }), _jsx("button", { onClick: handleBuyClick, className: "mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition", children: "Comprar servicio" })] }));
};
