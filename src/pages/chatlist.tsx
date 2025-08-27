import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Search, MoreVertical, Filter, User, UserCheck, UserX } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  lastSeen?: string;
}

const ChatList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
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

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

 const handleChatClick = (chatId: number) => {
  navigate(`/newchat/${chatId}`);
};

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getRandomColor = (name: string) => {
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Encabezado */}
      <Header>
        <div className="flex justify-between items-center w-full px-4">
          <h1 className="text-xl font-semibold text-white">Chats</h1>
          <div className="flex space-x-4">
            <button className="text-white">
              <Filter size={20} />
            </button>
            <button className="text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </Header>

      {/* Barra de búsqueda */}
      <div className="px-3 py-2 bg-white sticky top-0 z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar chats..."
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de chats */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No se encontraron chats</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center px-4 py-3 bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleChatClick(chat.id)}
            >
              {/* Avatar con icono */}
              <div className="relative mr-3">
                <div className={`${getRandomColor(chat.name)} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                  {chat.isOnline ? (
                    <UserCheck size={24} />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Contenido del chat */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-gray-900 truncate">{chat.name}</h2>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatTime(chat.time)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                      {chat.unread}
                    </span>
                  )}
                </div>
                {!chat.isOnline && chat.lastSeen && (
                  <p className="text-xs text-gray-400 mt-1">
                    Visto {chat.lastSeen}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatList;