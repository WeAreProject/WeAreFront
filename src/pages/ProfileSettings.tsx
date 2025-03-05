import React from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex p-10">
        <SettingsSidebar />
        
        <div className="flex-1 bg-white p-8 rounded-lg shadow-md mt-8">
          {/* Foto de perfil y nombre */}
          <div className="flex items-center space-x-4 mb-8">
            <img
              src="https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg" // URL de la imagen de perfil
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2> {/* Nombre */}
              <p className="text-gray-600">johndoe@example.com</p> {/* Correo electrónico */}
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600 mb-6">Manage your account settings and preferences.</p>

          {/* Formulario */}
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

