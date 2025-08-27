import {
  Menu, X, Home, Grid, ShoppingBag, CreditCard, Users, Briefcase,
  LayoutDashboard, Megaphone, Sun, Settings, LogOut, User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role || user.type || null);
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }
  }, []);

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-red-700 text-white"
      : "hover:bg-gray-200";

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* Header superior fijo */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white text-black z-50 shadow-sm flex items-center justify-between px-4">
        {/* Menú lateral */}
        <button onClick={() => setIsOpen(true)} className="focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>

        {/* Buscador centrado */}
        <div className="flex-1 px-2 max-w-md mx-auto block">
          <SearchBar
            placeholder="Buscar servicios..."
            onSearch={(query) => {
              localStorage.setItem("search_query", query);
              window.dispatchEvent(new Event("searchQueryUpdated"));
            }}
          />
        </div>

        {/* Logo al lado derecho */}
        <button onClick={() => navigate("/")} className="focus:outline-none">
          <img
            src="/images/category-icons/WRE.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </button>
      </header>

      {/* Fondo oscuro del menú */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-black p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-[60] overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">We Are</h1>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-auto">
            <p className="text-gray-500 uppercase text-sm font-semibold mb-2">Main Menu</p>
            <button onClick={() => handleNavigation("/")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/")}`}>
              <Home className="w-5 h-5" /> <span>Home</span>
            </button>
            <button onClick={() => handleNavigation("/categories")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/categories")}`}>
              <Grid className="w-5 h-5" /> <span>Categories</span>
            </button>
            <button onClick={() => handleNavigation("/mypurchases")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/mypurchases")}`}>
              <ShoppingBag className="w-5 h-5" /> <span>My purchases</span>
            </button>
            <button onClick={() => handleNavigation("/payment-methods")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/payment-methods")}`}>
              <CreditCard className="w-5 h-5" /> <span>Payment Methods</span>
            </button>
            <button onClick={() => handleNavigation("/refer")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/refer")}`}>
              <Users className="w-5 h-5" /> <span>Refer</span>
            </button>
          </div>

          {userRole === "owner" && (
            <div className="mb-auto mt-4">
              <p className="text-gray-500 uppercase text-sm font-semibold mb-2">My Services</p>
              <button onClick={() => handleNavigation("/MyServices")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/MyServices")}`}>
                <Briefcase className="w-5 h-5" /> <span>My Services</span>
              </button>
              <button onClick={() => handleNavigation("/ServiceDashboard")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/ServiceDashboard")}`}>
                <LayoutDashboard className="w-5 h-5" /> <span>Service Dashboard</span>
              </button>
              <button onClick={() => handleNavigation("/ads")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/ads")}`}>
                <Megaphone className="w-5 h-5" /> <span>Ads & Promotions</span>
              </button>
              <button onClick={() => handleNavigation("/Negocio")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/Negocio")}`}>
                <Briefcase className="w-5 h-5" /> <span>Negocio</span>
              </button>
              <button onClick={() => handleNavigation("/profile")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/profile")}`}>
                <User className="w-5 h-5" /> <span>Profile</span>
              </button>
            </div>
          )}

          <div className="mt-6">
            <p className="text-gray-500 uppercase text-sm font-semibold mb-2">Settings</p>
            <button className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/light-mode")}`}>
              <Sun className="w-5 h-5" /> <span>Light Mode</span>
            </button>
            <button onClick={() => handleNavigation("/profile-settings")} className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${isActive("/profile-settings")}`}>
              <Settings className="w-5 h-5" /> <span>Profile Settings</span>
            </button>
            <button onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 text-red-500 w-full text-left">
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
