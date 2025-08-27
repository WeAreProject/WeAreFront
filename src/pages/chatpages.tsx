import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Phone, Video, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
}

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const person = location.state?.person;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hola, soy ${person?.name}. ¿En qué puedo ayudarte?`,
      sender: "them",
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);
  const [showInfo, setShowInfo] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");

    // Respuesta automática
    setTimeout(() => {
      const replyMessage: Message = {
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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Header rojo oscuro */}
      <div className="flex items-center bg-red-800 text-white p-3 shadow-lg">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={24} />
        </button>
        <img
          src={person?.photoUrl || "/images/default-profile.png"}
          alt={person?.name}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div
          className="flex flex-col cursor-pointer flex-1"
          onClick={() => setShowInfo(true)}
        >
          <span className="font-semibold">{person?.name}</span>
          <span className="text-xs text-red-200">
            {person?.title || "Profesión no especificada"}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded-full hover:bg-red-900 transition">
            <Video size={20} />
          </button>
          <button className="p-1 rounded-full hover:bg-red-900 transition">
            <Phone size={20} />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-xs lg:max-w-md">
              <div
                className={`px-4 py-2 rounded-2xl shadow ${
                  msg.sender === "me"
                    ? "bg-red-800 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
              <div
                className={`text-xs mt-1 text-gray-500 ${
                  msg.sender === "me"
                    ? "text-right mr-2"
                    : "text-left ml-2"
                }`}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex items-center">
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-transparent focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className={`p-3 rounded-full text-white transition ${
            message.trim()
              ? "bg-red-800 hover:bg-red-900"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Panel de información */}
      {showInfo && (
        <div className="absolute inset-0 bg-white z-50 overflow-y-auto animate-fade-in">
          <div className="sticky top-0 flex items-center bg-red-800 text-white p-3 shadow-md">
            <button onClick={() => setShowInfo(false)} className="mr-3">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">Información de contacto</h2>
          </div>

          <div className="flex flex-col items-center p-6 bg-white">
            <img
              src={person?.photoUrl || "/images/default-profile.png"}
              alt="perfil"
              className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-red-800"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {person?.name}
            </h3>
            <p className="text-gray-600 mt-1">{person?.title}</p>
            <p className="text-gray-500 mt-2">
              {person?.bio || "Sin descripción"}
            </p>
          </div>

          {/* Botones mejor distribuidos */}
          <div className="p-6 bg-white border-t">
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200">
                <MessageCircle size={28} className="mb-2" />
                <span className="text-sm font-medium">Mensaje</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200">
                <Video size={28} className="mb-2" />
                <span className="text-sm font-medium">Video</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition-all duration-200">
                <Phone size={28} className="mb-2" />
                <span className="text-sm font-medium">Llamar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
