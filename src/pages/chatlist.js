import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Search, MoreVertical, Filter, User, UserCheck } from 'lucide-react';
const ChatList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState([
        {
            id: 1,
            name: 'Pedro Ramírez',
            lastMessage: '¡Hola! ¿Cómo estás?',
            time: '14:35',
            unread: 2,
            isOnline: true
        },
        {
            id: 2,
            name: 'Laura Gómez',
            lastMessage: 'Nos vemos mañana en la oficina',
            time: '12:10',
            unread: 0,
            isOnline: false,
            lastSeen: 'hace 30 min'
        },
        {
            id: 3,
            name: 'Carlos Sánchez',
            lastMessage: 'Listo, ya quedó el presupuesto',
            time: 'Ayer',
            unread: 5,
            isOnline: true
        },
        {
            id: 4,
            name: 'Ana Ruiz',
            lastMessage: 'Te mando los detalles por correo',
            time: 'Domingo',
            unread: 0,
            isOnline: false,
            lastSeen: 'hace 2 horas'
        },
        {
            id: 5,
            name: 'Mario Fernández',
            lastMessage: '¿Recibiste el paquete?',
            time: 'Viernes',
            unread: 0,
            isOnline: false,
            lastSeen: 'hace 1 día'
        }
    ]);
    const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleChatClick = (chatId) => {
        navigate(`/newchat/${chatId}`);
    };
    const formatTime = (timeString) => {
        return timeString;
    };
    const getRandomColor = (name) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-orange-500',
            'bg-indigo-500',
            'bg-teal-500',
            'bg-red-500'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [_jsx(Header, { children: _jsxs("div", { className: "flex justify-between items-center w-full px-4", children: [_jsx("h1", { className: "text-xl font-semibold text-white", children: "Chats" }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { className: "text-white", children: _jsx(Filter, { size: 20 }) }), _jsx("button", { className: "text-white", children: _jsx(MoreVertical, { size: 20 }) })] })] }) }), _jsx("div", { className: "px-3 py-2 bg-white sticky top-0 z-10", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "text-gray-400", size: 18 }) }), _jsx("input", { type: "text", placeholder: "Buscar chats...", className: "w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filteredChats.length === 0 ? (_jsx("div", { className: "flex flex-col items-center justify-center h-full text-gray-500", children: _jsx("p", { children: "No se encontraron chats" }) })) : (filteredChats.map((chat) => (_jsxs("div", { className: "flex items-center px-4 py-3 bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer", onClick: () => handleChatClick(chat.id), children: [_jsxs("div", { className: "relative mr-3", children: [_jsx("div", { className: `${getRandomColor(chat.name)} w-12 h-12 rounded-full flex items-center justify-center text-white`, children: chat.isOnline ? (_jsx(UserCheck, { size: 24 })) : (_jsx(User, { size: 24 })) }), chat.isOnline && (_jsx("div", { className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "font-medium text-gray-900 truncate", children: chat.name }), _jsx("span", { className: "text-xs text-gray-500 whitespace-nowrap ml-2", children: formatTime(chat.time) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-sm text-gray-600 truncate", children: chat.lastMessage }), chat.unread > 0 && (_jsx("span", { className: "bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2", children: chat.unread }))] }), !chat.isOnline && chat.lastSeen && (_jsxs("p", { className: "text-xs text-gray-400 mt-1", children: ["Visto ", chat.lastSeen] }))] })] }, chat.id)))) }), _jsx(BottomNav, {})] }));
};
export default ChatList;
