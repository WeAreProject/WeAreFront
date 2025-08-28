import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaWhatsapp, FaGlobe, FaEnvelope, FaShareAlt, FaStar, } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
const FakeProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const person = location.state?.person;
    useEffect(() => {
        if (!person) {
            navigate("/categories");
        }
    }, [person, navigate]);
    if (!person)
        return null;
    return (_jsxs("div", { className: "min-h-screen bg-white relative pb-24", children: [_jsx(Header, { children: _jsxs("button", { onClick: () => navigate("/categories"), className: "absolute left-4 flex items-center text-blue-600", children: [_jsx(ArrowLeft, { size: 20, className: "mr-1" }), "Volver"] }) }), _jsxs("main", { className: "flex flex-col items-center shadow-md rounded-2xl p-4 pb-24 relative bg-white max-w-md mx-auto", children: [_jsx("div", { className: "relative w-full h-56 bg-gray-200 overflow-hidden", children: _jsx("div", { className: "absolute top-0 left-0 w-full h-full z-0", style: {
                                backgroundImage: `url(${person.coverPhoto || "/default-cover.jpg"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderBottomLeftRadius: "70% 30%",
                                borderBottomRightRadius: "70% 30%",
                            } }) }), _jsx("div", { className: "relative -mt-16 z-10", children: _jsx("img", { src: person.photoUrl || "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg", alt: "Profile", className: "w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto" }) }), _jsxs("div", { className: "w-full flex flex-col items-center mt-2", children: [_jsx("h2", { className: "text-xl font-semibold text-center", children: person.name || "Nombre desconocido" }), _jsxs("div", { className: "w-full max-w-[200px] mt-1 flex justify-between px-2", children: [_jsx("p", { className: "text-gray-600 text-sm", children: person.title || "Profesión no especificada" }), _jsxs("div", { className: "flex items-center text-yellow-500", children: [_jsx(FaStar, { className: "text-sm" }), _jsx("span", { className: "ml-1 text-gray-700 font-semibold text-xs", children: "4.9" })] })] })] }), _jsx("div", { className: "w-full px-6 mt-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { className: "bg-black text-white px-4 py-1 rounded-full shadow hover:bg-gray-900 text-sm", onClick: () => alert("Funcionalidad no implementada"), children: "Rese\u00F1as" }), _jsxs("div", { className: "text-center text-gray-600 text-sm", children: [_jsx("p", { className: "font-semibold text-lg", children: "200" }), _jsx("p", { children: "(seguidores)" })] })] }) }), _jsxs("div", { className: "flex flex-col items-center gap-3 my-6", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx(IconBtn, { icon: _jsx(FaInstagram, { size: 20 }) }), _jsx(IconBtn, { icon: _jsx(FaFacebook, { size: 20 }) }), _jsx(IconBtn, { icon: _jsx(FaMapMarkerAlt, { size: 20 }) })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(IconBtn, { icon: _jsx(FaWhatsapp, { size: 20 }) }), _jsx(IconBtn, { icon: _jsx(FaGlobe, { size: 20 }) }), _jsx(IconBtn, { icon: _jsx(FaEnvelope, { size: 20 }) }), _jsx(IconBtn, { icon: _jsx(FaShareAlt, { size: 20 }) })] })] }), _jsx("div", { className: "w-full px-6", children: _jsx("p", { className: "text-sm text-gray-700 text-center", children: person.bio || "Este usuario aún no ha escrito una biografía." }) }), _jsxs("div", { className: "w-full px-6 mt-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("p", { className: "font-semibold text-red-600", children: "Fotos" }), _jsx("p", { className: "text-xs text-gray-500", children: "(m\u00E1ximo 5 im\u00E1genes)" })] }), _jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: ["src/cn/cn1.png", "src/cn/cn2.png", "src/cn/cn3.png"].map((src, index) => (_jsx("img", { src: src, alt: `Gallery ${index}`, className: "w-24 h-24 object-cover rounded-lg shadow-sm" }, index))) })] }), _jsxs("div", { className: "w-full flex justify-around mt-6 px-6", children: [_jsx("button", { className: "bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 text-sm", onClick: () => navigate("/calendar", { state: { person } }), children: "Agendar cita" }), _jsx("button", { className: "bg-black text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 text-sm", onClick: () => navigate("/chat", { state: { person } }), children: "Enviar mensaje" })] })] }), _jsx("div", { className: "absolute bottom-0 w-full", children: _jsx(BottomNav, {}) })] }));
};
const IconBtn = ({ icon }) => (_jsx("div", { className: "w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition", children: icon }));
export default FakeProfile;
