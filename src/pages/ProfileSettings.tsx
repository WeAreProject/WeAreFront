import React from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col lg:flex-row p-6 lg:p-10">
        <SettingsSidebar />

        {/* Contenido sin tarjeta */}
        <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
          {/* Foto de perfil y nombre */}
          <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 mb-8">
            <img
              src="https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600 mb-6">
            Manage your account settings and preferences.
          </p>

          {/* Formulario sin tarjeta */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 border rounded-lg"
            />
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

