import { useState, useEffect } from "react";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import { fetchCustomer } from "../actions/customers";
import { fetchOwner } from "../actions/owners";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGlobe,
  FaEnvelope,
  FaShareAlt,
  FaCamera,
  FaUpload,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

interface ExtendedUser {
  id: string;
  role: string;
  name?: string;
  image?: string;
  profession?: string;
  coverPhoto?: string;
  bio?: string;
}

const ProfileSettings = () => {
  const [userData, setUserData] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string>("/default-cover.jpg");
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataStr = localStorage.getItem("user");
        const savedCover = localStorage.getItem("coverPhoto");
        const savedImage = localStorage.getItem("profilePhoto");
        const savedGallery = localStorage.getItem("galleryPhotos");

        if (!userDataStr) {
          setError("No user data found in localStorage");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(userDataStr);

        let data;
        if (userData.role === "owner") {
          data = await fetchOwner(userData.id);
        } else {
          data = await fetchCustomer(userData.id);
        }

        const mergedData = {
          ...data,
          coverPhoto: savedCover || data?.coverPhoto || "/default-cover.jpg",
          image: savedImage || data?.image || "/default-profile.jpg",
        };

        setUserData(mergedData);
        setCoverPhoto(mergedData.coverPhoto);

        if (savedGallery) {
          setGalleryPhotos(JSON.parse(savedGallery));
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newCover = event.target.result as string;
          setCoverPhoto(newCover);
          localStorage.setItem("coverPhoto", newCover);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newProfile = event.target.result as string;
          setUserData((prev) => ({ ...prev!, image: newProfile }));
          localStorage.setItem("profilePhoto", newProfile);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, 5 - galleryPhotos.length);
      const promises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then(newPhotos => {
          const updated = [...galleryPhotos, ...newPhotos].slice(0, 5);
          setGalleryPhotos(updated);
          localStorage.setItem("galleryPhotos", JSON.stringify(updated));
        })
        .catch(err => console.error(err));
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: userData?.name || "Perfil",
          text: "Mira este perfil",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado al portapapeles");
      }
      setMoreOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="text-center p-6">Cargando...</div>;
  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-white relative pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white">
        <Header />
      </div>

      <div className="mt-16 sm:mt-20 lg:mt-0"></div>

      <div className="flex flex-col lg:flex-row lg:p-6 p-3 gap-4">
        <aside className="hidden lg:block lg:w-1/4">
          <SettingsSidebar />
        </aside>

        <main
          className="relative flex-1 flex flex-col items-center shadow-md rounded-2xl p-4 pb-16 bg-white
                     max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto w-full"
        >
          {/* Opciones */}
          <button
            aria-label="Más opciones"
            onClick={() => setMoreOpen((v) => !v)}
            className="absolute top-2 left-2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow flex items-center justify-center active:scale-95"
          >
            <FaChevronRight className="text-gray-700" />
          </button>

          {moreOpen && (
            <>
              <div
                className="fixed inset-0 z-30 bg-black/20"
                onClick={() => setMoreOpen(false)}
              />
              <div className="absolute top-12 left-2 z-40 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  onClick={() => {
                    navigate("/calendar", { state: { person: userData } });
                    setMoreOpen(false);
                  }}
                >
                  Agendar cita
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  onClick={() => {
                    navigate("/chat", { state: { person: userData } });
                    setMoreOpen(false);
                  }}
                >
                  Enviar mensaje
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  onClick={handleShare}
                >
                  Compartir perfil
                </button>
              </div>
            </>
          )}

          {/* Portada */}
          <div className="relative w-full h-44 sm:h-52 md:h-56 bg-gray-200 overflow-hidden rounded-b-2xl">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${coverPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <label className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100">
              <FaCamera className="text-gray-700 text-md" />
              <input type="file" className="hidden" accept="image/*" onChange={handleCoverPhotoUpload} />
            </label>
          </div>

          {/* Foto perfil */}
          <div className="relative -mt-14 sm:-mt-16 z-10">
            <img
              src={userData?.image || "/default-profile.jpg"}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
              <FaCamera className="text-gray-700 text-sm" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
              />
            </label>
          </div>

          {/* Nombre */}
          <div className="w-full flex flex-col items-center mt-2">
            <h2 className="text-lg sm:text-xl font-semibold text-center">{userData?.name || "Carlos Martinez"}</h2>
            <div className="w-full max-w-[220px] mt-1 flex justify-between px-2">
              <p className="text-gray-600 text-xs sm:text-sm">{userData?.profession || "Fotógrafo"}</p>
              <div className="flex items-center text-yellow-500 text-xs sm:text-sm">
                <FaStar className="text-xs" />
                <span className="ml-1 text-gray-700 font-semibold">4.9</span>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center gap-2 my-4">
            <div className="flex gap-3">
              <IconBtn icon={<FaInstagram size={18} />} />
              <IconBtn icon={<FaFacebook size={18} />} />
              <IconBtn icon={<FaMapMarkerAlt size={18} />} />
            </div>
            <div className="flex gap-3">
              <IconBtn icon={<FaWhatsapp size={18} />} />
              <IconBtn icon={<FaGlobe size={18} />} />
              <IconBtn icon={<FaShareAlt size={18} />} />
              {/* Uber como imagen */}
              <IconBtnImg 
                url="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
                alt="Uber" 
              />
            </div>
          </div>

          {/* Bio */}
          <div className="w-full px-4">
            <p className="text-xs sm:text-sm text-gray-700 text-center">
              {userData?.bio || "Este usuario aún no ha escrito una biografía."}
            </p>
          </div>

          {/* Galería */}
          <div className="w-full px-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-red-600 text-sm sm:text-base">Fotos</p>
              {galleryPhotos.length < 5 && (
                <label className="flex items-center px-2 py-1 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 text-xs sm:text-sm">
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
              )}
            </div>
            {galleryPhotos.length > 0 ? (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {galleryPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Gallery ${index}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs sm:text-sm">No hay fotos todavía</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfileSettings;

// Botón con íconos de react-icons
const IconBtn = ({ icon }: { icon: JSX.Element }) => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition">
    {icon}
  </div>
);

// Botón con imagen web (Uber, etc.)
const IconBtnImg = ({ url, alt }: { url: string; alt: string }) => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-full flex items-center justify-center bg-white hover:bg-gray-100 transition">
    <img src={url} alt={alt} className="w-5 h-5 object-contain" />
  </div>
);
