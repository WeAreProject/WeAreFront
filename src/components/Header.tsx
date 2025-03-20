import { Menu, X, Home, Grid, ShoppingBag, CreditCard, Users, Briefcase, LayoutDashboard, Megaphone, Sun, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Función para verificar qué ruta está activa
  const isActive = (path: string) => location.pathname === path ? "bg-purple-600 text-white" : "hover:bg-gray-200";

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.clear();
    // Redirigir al usuario a la página de login
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black p-4 z-50 shadow-md flex justify-between items-center">
      {/* Botón de Menú de Hamburguesa */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <Menu className="w-6 h-6" />
      </button>

      {/* Fondo oscuro al abrir el menú */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menú Lateral */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Botón para cerrar el menú */}
        <button onClick={() => setIsOpen(false)} className="self-end mb-4">
          <X className="w-6 h-6" />
        </button>

        {/* Contenedor flexible para distribuir secciones */}
        <div className="flex flex-col h-full">
          {/* Sección: Principal */}
          <div className="mb-auto">
            <p className="text-gray-500 uppercase text-sm font-semibold mb-2">Main Menu</p>
            <button onClick={() => navigate("/")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/")}`}>
              <Home className="w-5 h-5" /> <span>Home</span>
            </button>
            <button onClick={() => navigate("/categories")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/categories")}`}>
              <Grid className="w-5 h-5" /> <span>Categories</span>
            </button>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/purchases")}`}>
              <ShoppingBag className="w-5 h-5" /> <span>My purchases</span>
            </button>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/payment")}`}>
              <CreditCard className="w-5 h-5" /> <span>Payment Methods</span>
            </button>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/refer")}`}>
              <Users className="w-5 h-5" /> <span>Refer</span>
            </button>
          </div>

          {/* Sección: Servicios */}
          <div className="mb-auto">
            <p className="text-gray-500 uppercase text-sm font-semibold mb-2">My Services</p>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/services")}`}>
              <Briefcase className="w-5 h-5" /> <span>My Services</span>
            </button>
            <button className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/dashboard")}`}>
              <LayoutDashboard className="w-5 h-5" /> <span>Service Dashboard</span>
            </button>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/ads")}`}>
              <Megaphone className="w-5 h-5" /> <span>Ads & Promotions</span>
            </button>
          </div>

          {/* Sección: Configuración al final */}
          <div className="mt-auto">
            <p className="text-gray-500 uppercase text-sm font-semibold mb-2">Settings</p>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/light-mode")}`}>
              <Sun className="w-5 h-5" /> <span>Light Mode</span>
            </button>
            <button  className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/settings")}`}>
              <Settings className="w-5 h-5" /> <span>Settings</span>
            </button>
            <button onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 text-red-500 w-full text-left">
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
