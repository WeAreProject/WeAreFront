import { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";
import { fetchOwner } from "../actions/owners";

const ProfileSettings = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userDataStr = localStorage.getItem("user");
      console.log("userData:", userDataStr);
      
      if (!userDataStr) {
        console.error("No user data found");
        setLoading(false);
        setError("No user data found in localStorage");
        return;
      }

      try {
        const userData = JSON.parse(userDataStr);
        setLoading(true);
        setError(null);

        // Intentar obtener datos del servidor
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
            console.log("No se pudo obtener los datos del usuario del servidor, usando datos locales");
            // Si no se pueden obtener los datos del servidor, usar los datos locales
            setUserData(userData);
          }
        } catch (apiError) {
          console.error("Error fetching user data from API:", apiError);
          // En caso de error de API, usar los datos locales
          setUserData(userData);
          setError("No se pudo conectar con el servidor. Usando datos locales.");
        }
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        setError("Error al procesar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col lg:flex-row p-6 lg:p-10">
          <SettingsSidebar />
          <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0 flex items-center justify-center">
            <div className="text-center text-gray-600">Cargando...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col lg:flex-row p-6 lg:p-10">
          <SettingsSidebar />
          <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col lg:flex-row p-6 lg:p-10">
          <SettingsSidebar />
          <div className="flex-1 p-4 lg:p-8 mt-8 lg:mt-0 flex items-center justify-center">
            <div className="text-center text-red-500">No se pudo cargar el perfil del usuario.</div>
          </div>
        </div>
      </div>
    );
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