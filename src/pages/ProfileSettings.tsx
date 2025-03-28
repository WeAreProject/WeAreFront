import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";
import { fetchOwner } from "../actions/owners";

const ProfileSettings = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const userDataStr = localStorage.getItem("user");
      console.log("userData:", userDataStr);
      
      if (!userDataStr) {
        console.error("No user data found");
        setLoading(false);
        return;
      }

      const userData = JSON.parse(userDataStr);
      setLoading(true);

      try {
        let data;
        if (userData.role === 'owner') {
          data = await fetchOwner(userData.id);
        } else {
          data = await fetchCustomer(userData.id);
        }
        
        console.log("Fetched user data:", data);
        if (data) {
          setUserData(data);
        } else {
          console.log("No se pudo obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Cargando...</div>;
  }

  if (!userData) {
    return <div className="text-center text-red-500">No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col lg:flex-row p-6 lg:p-10">
        <SettingsSidebar />

        <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
          <div className="flex flex-col items-center justify-center mb-8">
            <img
              src={userData?.image || "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{userData?.name || userData?.full_name || "John Doe"}</h2>
              <p className="text-gray-600">{userData?.email || "email@example.com"}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600 mb-6">
            Manage your account settings and preferences.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              defaultValue={userData?.name || userData?.full_name || ""}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              defaultValue={userData?.email || ""}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 border rounded-lg"
              defaultValue={userData?.phone || ""}
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