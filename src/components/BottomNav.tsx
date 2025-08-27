import { Home, ShoppingBag, User, MessageSquare, Bell, DollarSign } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

interface Purchase {
  id: string;
  price: string;
}

interface Appointment {
  id: string;
  viewed: boolean;
}

interface Message {
  id: string;
  read: boolean;
}

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [counts, setCounts] = useState({
    purchases: 0,
    messages: 0,
    appointments: 0
  });
  const [totalAmount, setTotalAmount] = useState<number>(0);

const isActive = (path: string) =>
  location.pathname === path
    ? "text-red-700 font-semibold"
    : "text-gray-500 hover:text-red-600";


  const updateCountsAndTotal = useCallback(() => {
    try {
      const purchases: Purchase[] = JSON.parse(localStorage.getItem("user_purchases") || "[]");
      const appointments: Appointment[] = JSON.parse(localStorage.getItem("user_appointments") || "[]");
      const messages: Message[] = JSON.parse(localStorage.getItem("user_messages") || "[]");
      
      const calculatedTotal = purchases.reduce(
        (sum, purchase) => sum + parseFloat(purchase.price || "0"), 
        0
      );
      
      setCounts({
        purchases: purchases.length,
        messages: messages.filter(msg => !msg.read).length,
        appointments: appointments.filter(a => !a.viewed).length
      });
      
      setTotalAmount(calculatedTotal);
    } catch (error) {
      console.error("Error updating counts:", error);
    }
  }, []);

  useEffect(() => {
    updateCountsAndTotal();

    const handleStorageUpdate = () => {
      updateCountsAndTotal();
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("localStorageChange", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("localStorageChange", handleStorageUpdate);
    };
  }, [updateCountsAndTotal]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center h-16 z-50">
      {/* Home */}
      <button 
        onClick={() => navigate("/")} 
        className={`flex flex-col items-center ${isActive("/")}`}
        aria-label="Inicio"
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-xs">Inicio</span>
      </button>

      {/* Compras */}
      <button 
        onClick={() => navigate("/mypurchases")} 
        className={`relative flex flex-col items-center ${isActive("/mypurchases")}`}
        aria-label="Compras"
      >
        <ShoppingBag className="w-5 h-5 mb-1" />
        <span className="text-xs">Compras</span>
        {counts.purchases > 0 && (
          <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold bg-red-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
            {counts.purchases > 9 ? "9+" : counts.purchases}
          </span>
        )}
      </button>

      {/* Mensajes */}
      <button 
        onClick={() => navigate("/chatlist")} 
        className={`relative flex flex-col items-center ${isActive("/chatlist")}`}
        aria-label="Mensajes"
      >
        <MessageSquare className="w-5 h-5 mb-1" />
        <span className="text-xs">Mensajes</span>
        {counts.messages > 0 && (
          <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
            {counts.messages > 9 ? "9+" : counts.messages}
          </span>
        )}
      </button>

      {/* Notificaciones */}
      <button 
        onClick={() => navigate("/notifications")} 
        className={`relative flex flex-col items-center ${isActive("/notifications")}`}
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5 mb-1" />
        <span className="text-xs">Notificaciones</span>
        {counts.appointments > 0 && (
          <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center border border-white">
            {counts.appointments > 9 ? "9+" : counts.appointments}
          </span>
        )}
      </button>

      {/* Perfil + Total Gastado (Compacto) */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => navigate("/profile-settings")}
          className={`flex flex-col items-center ${isActive("/profile-settings")}`}
          aria-label="Perfil"
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Perfil</span>
        </button>
       <div className="text-xs text-red-700 font-medium">
  ${totalAmount.toFixed(0)}
</div>

      </div>
    </div>
  );
};

export default BottomNav;