import { NavLink } from "react-router-dom";
import { FaUser, FaBell, FaLock, FaHeadset } from "react-icons/fa";

const SettingsSidebar = () => {
  return (
    <div className="w-full md:w-64 p-4 bg-white shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <ul>
        <li>
          <NavLink 
            to="/settings/profile" 
            className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
          >
            <FaUser className="mr-2" /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings/notifications" 
            className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
          >
            <FaBell className="mr-2" /> Notifications
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings/security" 
            className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
          >
            <FaLock className="mr-2" /> Security
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings/support" 
            className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
          >
            <FaHeadset className="mr-2" /> Support
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;