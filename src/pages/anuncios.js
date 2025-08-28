import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
const topAds = [
    {
        id: 1,
        title: "Corte de cabello profesional",
        description: "Luce increíble con los mejores barberos de tu zona.",
        image: "src/assets/an/co.png",
    },
    {
        id: 2,
        title: "Servicio de limpieza express",
        description: "Tu casa reluciente en menos de 2 horas.",
        image: "src/assets/an/li.png",
    },
    {
        id: 3,
        title: "Clases de guitarra a domicilio",
        description: "Aprende desde cero con músicos certificados.",
        image: "src/assets/an/gui.png",
    },
    {
        id: 4,
        title: "Spa de uñas y pedicure",
        description: "Relájate con nuestro spa premium.",
        image: "src/assets/an/pa.png",
    },
    {
        id: 5,
        title: "Fotografía profesional",
        description: "Captura tus mejores momentos.",
        image: "src/assets/an/fo.png",
    },
    {
        id: 6,
        title: "Masajes relajantes",
        description: "Dile adiós al estrés.",
        image: "src/assets/an/ma.png",
    },
    {
        id: 7,
        title: "Clases de inglés personalizadas",
        description: "Aprende inglés como nunca antes.",
        image: "src/assets/an/in.png",
    },
    {
        id: 8,
        title: "Taller de mecánica rápida",
        description: "Repara tu coche sin perder tiempo.",
        image: "src/assets/an/ta.png",
    },
    {
        id: 9,
        title: "Maquillaje profesional",
        description: "Ideal para eventos y sesiones de fotos.",
        image: "src/assets/an/mp.png",
    },
    {
        id: 10,
        title: "Diseño gráfico y logos",
        description: "Haz que tu marca se vea poderosa.",
        image: "src/assets/an/xd.png",
    },
];
const Anuncios = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const navigate = useNavigate();
    return (_jsxs("div", { className: "pb-16", children: [_jsx(Header, {}), _jsxs("div", { className: "px-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Anuncios Destacados" }), _jsx("div", { className: "grid grid-cols-1 gap-5", children: topAds.map((ad, index) => {
                            // Primeros 3 con animación RGB circular interna
                            if (index < 3) {
                                const animationSpeeds = [
                                    "animate-[rgbPulse_2s_linear_infinite]", // Más rápido (1er lugar)
                                    "animate-[rgbPulse_3s_linear_infinite]", // Medio (2do lugar)
                                    "animate-[rgbPulse_4s_linear_infinite]", // Más lento (3er lugar)
                                ];
                                const gradientColors = [
                                    "from-red-500/30 via-transparent to-transparent", // 1er lugar
                                    "from-green-500/30 via-transparent to-transparent", // 2do lugar
                                    "from-blue-500/30 via-transparent to-transparent", // 3er lugar
                                ];
                                return (_jsxs("div", { onClick: () => setSelectedAd(ad.id), className: `relative rounded-2xl overflow-hidden transition-all duration-300 
                  hover:scale-[1.02] shadow-lg hover:shadow-xl cursor-pointer
                  ${selectedAd === ad.id ? 'ring-4 ring-purple-500 scale-[1.02]' : ''}`, children: [_jsx("div", { className: `absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientColors[index]} ${animationSpeeds[index]} z-0` }), _jsxs("div", { className: "relative rounded-2xl overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: ad.image, alt: ad.title, className: "w-full h-48 object-cover opacity-90" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20" })] }), _jsxs("div", { className: "p-4 relative z-10", children: [_jsxs("h2", { className: "text-xl font-extrabold flex items-center gap-2 text-white", children: [_jsx("span", { className: "drop-shadow-md", children: "\uD83D\uDD25" }), _jsx("span", { className: "drop-shadow-md", children: ad.title })] }), _jsx("p", { className: "text-sm mt-1 text-white/90", children: ad.description })] })] })] }, ad.id));
                            }
                            // 4to y 5to con borde RGB estático
                            if (index < 5) {
                                const staticColors = [
                                    "border-l-4 border-t-4 border-pink-500", // 4to
                                    "border-l-4 border-t-4 border-cyan-500", // 5to
                                ];
                                return (_jsxs("div", { onClick: () => setSelectedAd(ad.id), className: `rounded-2xl overflow-hidden transition-all duration-300 
                  hover:scale-[1.02] bg-white ${staticColors[index - 3]}
                  shadow-md hover:shadow-lg relative cursor-pointer
                  ${selectedAd === ad.id ? 'ring-2 ring-purple-500 scale-[1.02]' : ''}`, children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: ad.image, alt: ad.title, className: "w-full h-44 object-cover" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent h-20" })] }), _jsxs("div", { className: "p-4", children: [_jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-gray-800", children: [_jsx("span", { className: "text-pink-500", children: "\u2B50" }), ad.title] }), _jsx("p", { className: "text-sm mt-1 text-gray-600", children: ad.description })] })] }, ad.id));
                            }
                            // Últimos 5 - diseño más tranquilo con efecto selección
                            return (_jsxs("div", { onClick: () => setSelectedAd(ad.id), className: `bg-white border border-gray-200 rounded-xl shadow-sm 
                overflow-hidden hover:shadow-md transition duration-300 
                hover:border-blue-300 cursor-pointer
                ${selectedAd === ad.id ? 'bg-blue-50 border-blue-400' : ''}`, children: [_jsx("img", { src: ad.image, alt: ad.title, className: "w-full h-40 object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-lg font-bold text-gray-800", children: ad.title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: ad.description })] })] }, ad.id));
                        }) })] }), _jsx("div", { className: "fixed bottom-20 right-4 z-50", children: _jsx("button", { onClick: () => navigate("/promo"), className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300", children: "\uD83C\uDF1F Promoc\u00EDnate" }) }), _jsx(BottomNav, {}), _jsx("style", { jsx: true, global: true, children: `
        @keyframes rgbPulse {
          0% {
            background-color: rgba(255, 0, 0, 0.3);
          }
          33% {
            background-color: rgba(0, 255, 0, 0.3);
          }
          66% {
            background-color: rgba(0, 0, 255, 0.3);
          }
          100% {
            background-color: rgba(255, 0, 0, 0.3);
          }
        }
      ` })] }));
};
export default Anuncios;
