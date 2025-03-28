import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";

const ProfileSettings = () => {
  const [customer, setCustomer] = useState<any | null>(null);  // Tipo de estado para almacenar los datos del cliente
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const loadCustomer = async () => {
      // Obtenemos el "user" del localStorage
      const userData = localStorage.getItem("user");
      console.log("userData:", userData); // Verifica que los datos estén en localStorage
      if (!userData) {
        console.error("No user data found");
        setLoading(false);
        return;
      }

      // Parseamos el userData y obtenemos el id
      const { id } = JSON.parse(userData);
      setLoading(true); // Empieza a cargar los datos

      try {
        const data = await fetchCustomer(id); // Usamos la función fetchCustomer que ya tienes
        console.log("Fetched customer data:", data); // Verifica los datos obtenidos
        if (data) {
          setCustomer(data);
        } else {
          console.log("No se pudo obtener los datos del cliente");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, []); // Dependencia vacía, solo se ejecuta una vez al cargar el componente

  // Si los datos están cargando, muestra un mensaje de "Loading..."
  if (loading) {
    return <div className="text-center text-gray-600">Cargando...</div>;
  }

  // Si no se puede cargar el perfil, muestra un mensaje de error
  if (!customer) {
    return <div className="text-center text-red-500">No se pudo cargar el perfil del cliente.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col lg:flex-row p-6 lg:p-10">
        <SettingsSidebar />

        <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
          {/* Foto de perfil y nombre */}
          <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 mb-8">
            <img
              src={customer?.image || "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold">{customer?.full_name || "John Doe"}</h2>
              <p className="text-gray-600">{customer?.email || "email@example.com"}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600 mb-6">
            Manage your account settings and preferences.
          </p>

          {/* Formulario */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              defaultValue={customer?.full_name || ""}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              defaultValue={customer?.email || ""}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 border rounded-lg"
              defaultValue={customer?.phone || ""}
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
