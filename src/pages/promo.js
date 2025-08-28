import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
const promoAds = [
    {
        id: 1,
        title: "Top 1: Entrenador personal",
        description: "Transforma tu cuerpo desde casa.",
        color: "from-yellow-400 to-orange-500",
        icon: "💪",
        price: "$199 MXN",
    },
    {
        id: 2,
        title: "Top 2: Clases de canto",
        description: "Conviértete en la próxima estrella.",
        color: "from-indigo-400 to-purple-500",
        icon: "🎤",
        price: "$149 MXN",
    },
    {
        id: 3,
        title: "Top 3: Repostería gourmet",
        description: "Delicias que enamoran.",
        color: "from-pink-400 to-red-400",
        icon: "🍰",
        price: "$179 MXN",
    },
    {
        id: 4,
        title: "Publicidad estándar",
        description: "Aumenta tu visibilidad ahora.",
        icon: "📣",
        price: "$99 MXN",
    },
    {
        id: 5,
        title: "Publicidad básica",
        description: "Una forma fácil de empezar.",
        icon: "📦",
        price: "$49 MXN",
    },
];
const Promo = () => {
    const navigate = useNavigate();
    const handleBuy = () => {
        navigate("/p2w");
    };
    const handleBack = () => {
        navigate("/anuncios");
    };
    return (_jsxs("div", { className: "pb-24", children: [_jsx(Header, {}), _jsxs("div", { className: "px-4 mt-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-gray-800", children: "Tus Opciones de Publicidad" }), _jsx("div", { className: "grid grid-cols-1 gap-6", children: promoAds.map((ad, index) => {
                            const isTop = index < 3;
                            return (_jsx("div", { className: `relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${isTop
                                    ? `bg-gradient-to-br ${ad.color} animate-[rgbPulse_4s_linear_infinite] text-white`
                                    : "bg-white border border-gray-200 text-gray-800"} hover:scale-[1.02]`, children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "text-4xl mb-2", children: ad.icon }), _jsx("h2", { className: "text-xl font-extrabold", children: ad.title }), _jsx("p", { className: "text-sm mt-1", children: ad.description }), _jsx("p", { className: "mt-2 font-bold text-lg", children: ad.price }), _jsx("button", { onClick: handleBuy, className: `mt-4 w-full py-2 rounded-md font-semibold transition ${isTop
                                                ? "bg-white text-black hover:bg-gray-200"
                                                : "bg-green-600 text-white hover:bg-green-700"}`, children: "Comprar" })] }) }, ad.id));
                        }) }), _jsx("div", { className: "mt-10 text-center", children: _jsx("button", { onClick: handleBack, className: "px-6 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition", children: "Volver a anuncios" }) })] }), _jsx(BottomNav, {}), _jsx("style", { jsx: true, global: true, children: `
        @keyframes rgbPulse {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
          100% {
            filter: brightness(1);
          }
        }
      ` })] }));
};
export default Promo;
