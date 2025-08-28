import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MessageCircle, Phone, Video } from "lucide-react";
// Usuarios que coinciden con los del ChatList
const users = [
    {
        id: "1",
        name: "Pedro Ramírez",
        status: "en línea",
        phone: "+1 234 567 8900",
        info: "Desarrollador de software",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        isOnline: true,
        lastSeen: ""
    },
    {
        id: "2",
        name: "Laura Gómez",
        status: "últ. vez hace 30 min",
        phone: "+1 234 567 8901",
        info: "Diseñadora gráfica",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        isOnline: false,
        lastSeen: "hace 30 min"
    },
    {
        id: "3",
        name: "Carlos Sánchez",
        status: "en línea",
        phone: "+1 234 567 8902",
        info: "Arquitecto",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        isOnline: true,
        lastSeen: ""
    },
    {
        id: "4",
        name: "Ana Ruiz",
        status: "últ. vez hace 2 horas",
        phone: "+1 234 567 8903",
        info: "Médico",
        photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        isOnline: false,
        lastSeen: "hace 2 horas"
    },
    {
        id: "5",
        name: "Mario Fernández",
        status: "últ. vez hace 1 día",
        phone: "+1 234 567 8904",
        info: "Chef",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        isOnline: false,
        lastSeen: "hace 1 día"
    }
];
const NewChat = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    // Encontrar el contacto basado en el ID de la URL
    const contact = users.find(user => user.id === chatId) || users[0];
    // Mensajes iniciales diferentes para cada usuario
    const initialMessages = {
        "1": [
            { text: "¡Hola! ¿Cómo estás?", sender: "other", time: "14:32" },
            { text: "¡Hola Pedro! Bien, ¿y tú?", sender: "me", time: "14:33" },
            { text: "Todo bien por aquí. ¿Avanzamos con el proyecto?", sender: "other", time: "14:34" },
        ],
        "2": [
            { text: "Nos vemos mañana en la oficina", sender: "other", time: "12:10" },
            { text: "Perfecto, ¿a qué hora?", sender: "me", time: "12:12" },
        ],
        "3": [
            { text: "Listo, ya quedó el presupuesto", sender: "other", time: "10:25" },
            { text: "¡Excelente! ¿Me lo puedes enviar?", sender: "me", time: "10:30" },
        ],
        "4": [
            { text: "Te mando los detalles por correo", sender: "other", time: "09:15" },
            { text: "Gracias Ana, lo estaré revisando", sender: "me", time: "09:20" },
        ],
        "5": [
            { text: "¿Recibiste el paquete?", sender: "other", time: "16:45" },
            { text: "Sí, llegó en perfecto estado. ¡Gracias!", sender: "me", time: "16:50" },
        ]
    };
    const [showInfo, setShowInfo] = useState(false);
    const [messages, setMessages] = useState(initialMessages[chatId || "1"] || []);
    const [input, setInput] = useState("");
    const sendMessage = () => {
        if (input.trim() === "")
            return;
        const newMessage = {
            text: input,
            sender: "me",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        // Respuesta automática después de 1 segundo
        setTimeout(() => {
            const autoReplies = [
                "¡Qué bien! 😄",
                "Interesante, cuéntame más...",
                "Jajaja 😂",
                "Estoy de acuerdo contigo 👍",
            ];
            const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
            const botMessage = {
                text: randomReply,
                sender: "other",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100 relative", children: [_jsxs("div", { className: "flex items-center bg-red-800 text-white p-3 shadow-lg", children: [_jsx("button", { onClick: () => navigate(-1), className: "mr-3", children: _jsx(ArrowLeft, { size: 24 }) }), _jsx("img", { src: contact.photo, alt: "perfil", className: "w-10 h-10 rounded-full mr-3 object-cover" }), _jsxs("div", { className: "flex flex-col cursor-pointer flex-1", onClick: () => setShowInfo(true), children: [_jsx("span", { className: "font-semibold", children: contact.name }), _jsx("span", { className: "text-xs text-red-200", children: contact.isOnline ? "en línea" : contact.lastSeen ? `últ. vez ${contact.lastSeen}` : "desconectado" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { className: "p-1 rounded-full hover:bg-red-900 transition", children: _jsx(Video, { size: 20 }) }), _jsx("button", { className: "p-1 rounded-full hover:bg-red-900 transition", children: _jsx(Phone, { size: 20 }) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100", children: messages.map((msg, index) => (_jsx("div", { className: `flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: "max-w-xs", children: [_jsx("div", { className: `px-4 py-2 rounded-2xl shadow ${msg.sender === "me"
                                    ? "bg-red-800 text-white rounded-br-md"
                                    : "bg-white text-gray-800 rounded-bl-md"}`, children: msg.text }), _jsx("div", { className: `text-xs mt-1 text-gray-500 ${msg.sender === "me" ? "text-right mr-2" : "text-left ml-2"}`, children: msg.time })] }) }, index))) }), _jsxs("div", { className: "p-3 bg-white border-t flex items-center", children: [_jsx("div", { className: "flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2", children: _jsx("input", { type: "text", placeholder: "Escribe un mensaje...", className: "flex-1 bg-transparent focus:outline-none", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && sendMessage() }) }), _jsx("button", { onClick: sendMessage, disabled: !input.trim(), className: `p-3 rounded-full text-white transition ${input.trim() ? "bg-red-800 hover:bg-red-900" : "bg-gray-400 cursor-not-allowed"}`, children: _jsx(Send, { size: 20 }) })] }), showInfo && (_jsxs("div", { className: "absolute inset-0 bg-white z-50 overflow-y-auto animate-fade-in", children: [_jsxs("div", { className: "sticky top-0 flex items-center bg-red-800 text-white p-3 shadow-md", children: [_jsx("button", { onClick: () => setShowInfo(false), className: "mr-3", children: _jsx(ArrowLeft, { size: 24 }) }), _jsx("h2", { className: "text-lg font-semibold", children: "Informaci\u00F3n de contacto" })] }), _jsxs("div", { className: "flex flex-col items-center p-6 bg-white", children: [_jsx("img", { src: contact.photo, alt: "perfil", className: "w-32 h-32 rounded-full mb-4 object-cover border-4 border-red-800" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-800", children: contact.name }), _jsx("p", { className: "text-gray-600 mt-1", children: contact.info }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full mr-2 ${contact.isOnline ? 'bg-green-500' : 'bg-gray-400'}` }), _jsx("span", { className: "text-sm text-gray-500", children: contact.isOnline ? 'En línea' : `Últ. vez ${contact.lastSeen}` })] })] }), _jsx("div", { className: "p-6 bg-gray-50", children: _jsxs("div", { className: "bg-white rounded-xl shadow-sm p-4", children: [_jsx("h4", { className: "font-medium text-gray-700 mb-3", children: "Informaci\u00F3n de contacto" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Tel\u00E9fono" }), _jsx("p", { className: "text-gray-800", children: contact.phone })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Estado" }), _jsx("p", { className: "text-gray-800", children: contact.isOnline ? "En línea" : contact.lastSeen ? `Última vez ${contact.lastSeen}` : "Desconectado" })] })] })] }) }), _jsx("div", { className: "p-6 bg-white border-t", children: _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(MessageCircle, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Mensaje" })] }), _jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(Video, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Video" })] }), _jsxs("button", { className: "flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200", children: [_jsx(Phone, { size: 28, className: "mb-2" }), _jsx("span", { className: "text-sm font-medium", children: "Llamar" })] })] }) })] })), _jsx("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      ` })] }));
};
export default NewChat;
