import React from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";

const SecuritySettings = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-10">
      <Header />
      <SettingsSidebar />
      <div className="flex-1 p-8 mt-8"> {/* Se eliminan las clases de borde y sombra */}
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences.</p>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border rounded-lg"
          />
          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;