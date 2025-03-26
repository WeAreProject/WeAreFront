import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBell, FaLock, FaHeadset, FaChevronDown, FaChevronUp } from "react-icons/fa";

const SettingsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative m3 ml-[-20px]">
      {/* Contenedor de la flecha */}
      <div
        className="cursor-pointer flex items-center justify-start fixed top-[4rem] md:top-[5rem] left-[23px] z-0" // Ajuste de 2mm hacia la derecha
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>

      {/* Menú desplegable flotante */}
      {isOpen && (
        <ul className="absolute left-[15px] top-[3.5rem] mt-2 bg-white shadow-lg rounded-lg p-2 min-w-max space-y-1 z-50">
          <li>
            <NavLink 
              to="/settings/profile" 
              className={({ isActive }) => `flex items-center p-2 text-sm rounded-lg ${isActive ? "text-blue-700" : ""}`}
            >
              <FaUser className="mr-2" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings/notifications" 
              className={({ isActive }) => `flex items-center p-2 text-sm rounded-lg ${isActive ? "text-blue-700" : ""}`}
            >
              <FaBell className="mr-2" /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings/security" 
              className={({ isActive }) => `flex items-center p-2 text-sm rounded-lg ${isActive ? "text-blue-700" : ""}`}
            >
              <FaLock className="mr-2" /> Security
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings/support" 
              className={({ isActive }) => `flex items-center p-2 text-sm rounded-lg ${isActive ? "text-blue-700" : ""}`}
            >
              <FaHeadset className="mr-2" /> Support
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SettingsSidebar;
