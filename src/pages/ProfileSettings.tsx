import { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";
import { fetchOwner } from "../actions/owners";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaCamera,
  FaUpload,
  FaPen
} from "react-icons/fa";

const ProfileSettings = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userDataStr = localStorage.getItem("user");

      if (!userDataStr) {
        setLoading(false);
        setError("No user data found in localStorage");
        return;
      }

      try {
        const userData = JSON.parse(userDataStr);
        setLoading(true);
        setError(null);

        try {
          let data;
          if (userData.role === 'owner') {
            data = await fetchOwner(userData.id);
          } else {
            data = await fetchCustomer(userData.id);
          }

          if (data) {
            setUserData(data);
            if (data.coverPhoto) setCoverPhoto(data.coverPhoto);
            if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
          } else {
            setUserData(userData);
          }
        } catch (apiError) {
          setUserData(userData);
          setError("No se pudo conectar con el servidor. Usando datos locales.");
        }
      } catch (parseError) {
        setError("Error al procesar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverPhoto(event.target.result as string);
          setTimeout(() => setUploading(false), 1000);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const files = Array.from(e.target.files);
      const newPhotos: string[] = [];

      const readFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.readAsDataURL(file);
        });
      };

      for (const file of files) {
        const photo = await readFile(file);
        newPhotos.push(photo);
      }

      setGalleryPhotos([...galleryPhotos, ...newPhotos]);
      setTimeout(() => setUploading(false), 1000);
    }
  };

  const openSocialMedia = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = "https://facebook.com";
        break;
      case "twitter":
        url = "https://twitter.com";
        break;
      case "linkedin":
        url = "https://linkedin.com";
        break;
      case "instagram":
        url = "https://instagram.com";
        break;
    }
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-col p-4">
          <SettingsSidebar />
          <div className="flex-1 p-4 mt-4 flex items-center justify-center">
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
        <div className="flex flex-col p-4">
          <SettingsSidebar />
          <div className="flex-1 p-4 mt-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
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
        <div className="flex flex-col p-4">
          <SettingsSidebar />
          <div className="flex-1 p-4 mt-4 flex items-center justify-center">
            <div className="text-center text-red-500">No se pudo cargar el perfil del usuario.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col p-4">
        <SettingsSidebar />

        <div className="flex-1 flex flex-col items-center bg-white shadow-md rounded-2xl p-6 relative mt-4">
          {/* Portada */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-200">
            <div
              className="w-full h-full"
              style={{ backgroundImage: coverPhoto ? `url(${coverPhoto})` : "none" }}
            >
              {!coverPhoto && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              )}
            </div>
            <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
              <FaCamera className="text-gray-700 text-sm" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPhotoUpload}
              />
            </label>
          </div>

          {/* Foto de perfil */}
          <div className="relative -mt-16">
            <img
              src={userData?.image || "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
              <FaCamera className="text-gray-700 text-sm" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPhotoUpload}
              />
            </label>
          </div>

          {/* Info usuario */}
          <div className="text-center mt-4 w-full">
            <h2 className="text-xl font-semibold">{userData?.name || userData?.full_name || "John Doe"}</h2>
            <p className="text-gray-500">{userData?.profession || "Abogado"}</p>

            <div className="flex items-center justify-center my-2">
              <span className="text-yellow-400">★ ★ ★ ★ ☆</span>
              <span className="ml-2 text-gray-600">4.0</span>
            </div>

            <div className="mb-3">
              <span className="text-gray-700 font-medium">200 seguidores</span>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button onClick={() => openSocialMedia("facebook")} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"><FaFacebook size={14} /></button>
              <button onClick={() => openSocialMedia("twitter")} className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"><FaTwitter size={14} /></button>
              <button onClick={() => openSocialMedia("linkedin")} className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"><FaLinkedin size={14} /></button>
              <button onClick={() => openSocialMedia("instagram")} className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"><FaInstagram size={14} /></button>
            </div>
          </div>

          {/* Galería */}
          <div className="w-full mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-left font-semibold text-red-600">Fotos</p>
              <label className="flex items-center px-3 py-1 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 text-sm">
                <FaUpload className="mr-1" size={12} />
                Subir
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                />
              </label>
            </div>

            {galleryPhotos.length > 0 ? (
              <div className="flex space-x-2 overflow-x-auto">
                {galleryPhotos.map((photo, index) => (
                  <div key={index} className="min-w-[80px] h-20 flex-shrink-0">
                    <img
                      src={photo}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm">No hay fotos todavía</p>
              </div>
            )}
          </div>

          {/* Edición del perfil */}
          <div className="w-full mt-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-gray-800">Información del perfil</p>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
                title="Editar perfil"
              >
                <FaPen size={14} />
              </button>
            </div>

            {showEdit && (
              <div className="space-y-4 transition-all duration-300">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Nombre completo</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-sm"
                    defaultValue={userData?.name || userData?.full_name || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg text-sm"
                    defaultValue={userData?.email || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-lg text-sm"
                    defaultValue={userData?.phone || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Profesión</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-sm"
                    defaultValue={userData?.profession || "Abogado"}
                  />
                </div>
                <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 text-sm">
                  Actualizar perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
