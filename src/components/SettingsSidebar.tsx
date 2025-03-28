import { NavLink } from "react-router-dom";
import { FaUser, FaBell, FaLock, FaHeadset, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";

const SettingsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú móvil */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 left-0 z-50 lg:hidden bg-white rounded-r-lg p-2 shadow-md"
      >
        {isOpen ? <FaChevronLeft className="text-gray-600" /> : <FaChevronRight className="text-gray-600" />}
      </button>

      {/* Overlay para cerrar el menú en móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative w-64 bg-white rounded-lg p-4 h-fit mt-20 z-40
        transition-transform duration-300 ease-in-out shadow-lg
        lg:transform-none lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <NavLink 
          to="/profile-settings" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
          onClick={() => setIsOpen(false)}
        >
          <FaUser className="mr-3" /> Profile
        </NavLink>
        
        <NavLink 
          to="/notification-settings" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
          onClick={() => setIsOpen(false)}
        >
          <FaBell className="mr-3" /> Notifications
        </NavLink>
        
        <NavLink 
          to="/security-settings" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
          onClick={() => setIsOpen(false)}
        >
          <FaLock className="mr-3" /> Security
        </NavLink>
        
        <NavLink 
          to="/support-settings" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg mb-2 ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
          onClick={() => setIsOpen(false)}
        >
          <FaHeadset className="mr-3" /> Support
        </NavLink>
      </div>
    </>
  );
};

export default SettingsSidebar;