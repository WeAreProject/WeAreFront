import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Phone, Video, MessageCircle } from "lucide-react";
const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const person = location.state?.person;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            id: "1",
            text: `Hola, soy ${person?.name}. ¿En qué puedo ayudarte?`,
            sender: "them",
            timestamp: new Date(Date.now() - 3600000),
        },
    ]);
    const [showInfo, setShowInfo] = useState(false);
    const handleSendMessage = () => {
        if (message.trim() === "")
            return;
        const newMessage = {
            id: Date.now().toString(),
            text: message,
            sender: "me",
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
        setMessage("");
        // Respuesta automática
        setTimeout(() => {
            const replyMessage = {
                id: (Date.now() + 1).toString(),
                text: `Gracias por tu mensaje sobre mis servicios como ${person?.title}. Te responderé pronto.`,
                sender: "them",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, replyMessage]);
        }, 1000);
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100 relative", children: [_jsxs("div", { className: "flex items-center bg-red-800 text-white p-3 shadow-lg", children: [_jsx("button", { onClick: () => navigate(-1), className: "mr-3", children: _jsx(ArrowLeft, { size: 24 }) }), _jsx("img", { src: person?.photoUrl || "/images/default-profile.png", alt: person?.name, className: "w-10 h-10 rounded-full mr-3 object-cover" }), _jsxs("div", { className: "flex flex-col cursor-pointer flex-1", onClick: () => setShowInfo(true), children: [_jsx("span", { className: "font-semibold", children: person?.name }), _jsx("span", { className: "text-xs text-red-200", children: person?.title || "Profesión no especificada" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { className: "p-1 rounded-full hover:bg-red-900 transition", children: _jsx(Video, { size: 20 }) }), _jsx("button", { className: "p-1 rounded-full hover:bg-red-900 transition", children: _jsx(Phone, { size: 20 }) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100", children: [messages.map((msg) => (_jsx("div", { className: `flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: "max-w-xs lg:max-w-md", children: [_jsx("div", { className: `px-4 py-2 rounded-2xl shadow ${msg.sender === "me"
                                        ? "bg-red-800 text-white rounded-br-md"
                                        : "bg-white text-gray-800 rounded-bl-md"}`, children: msg.text }), _jsx("div", { className: `text-xs mt-1 text-gray-500 ${msg.sender === "me"
                                        ? "text-right mr-2"
                                        : "text-left ml-2"}`, children: formatTime(msg.timestamp) })] }) }, msg.id))), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "p-3 bg-white border-t flex items-center", children: [_jsx("div", { className: "flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2", children: _jsx("input", { type: "text", placeholder: "Escribe tu mensaje...", className: "flex-1 bg-transparent focus:outline-none", value: message, onChange: (e) => setMessage(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleSendMessage() }) }), _jsx("button", { onClick: handleSendMessage, disabled: !message.trim(), className: `p-3 rounded-full text-white transition ${message.trim()
                            ? "bg-red-800 hover:bg-red-900"
                            : "bg-gray-400 cursor-not-allowed"}`, children: _jsx(Send, { size: 20 }) })] }), showInfo && (_jsxs("div", { className: "absolute inset-0 bg-white z-50 overflow-y-auto animate-fade-in", children: [_jsxs("div", { className: "sticky top-0 flex items-center bg-red-800 text-white p-3 shadow-md", children: [_jsx("button", { onClick: () => setShowInfo(false), className: "mr-3", children: _jsx(ArrowLeft, { size: 24 }) }), _jsx("h2", { className: "text-lg font-semibold", children: "Informaci\u00F3n de contacto" })] }), _jsxs("div", { className: "flex flex-col items-center p-6 bg-white", children: [_jsx("img", { src: person?.photoUrl || "/images/default-profile.png", alt: "perfil", className: "w-32 h-32 rounded-full mb-4 object-cover border-4 border-red-800" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-800", children: person?.name }), _jsx("p", { className: "text-gray-600 mt-1", children: person?.title }), _jsx("p", { className: "text-gray-500 mt-2", children: person?.bio || "Sin descripción" })] }), _jsx("div", { className: "p-6 bg-white border-t", children: _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(MessageCircle, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Mensaje" })] }), _jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(Video, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Video" })] }), _jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(Phone, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Llamar" })] })] }) })] })), _jsx("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      ` })] }));
};
export default ChatPage;
