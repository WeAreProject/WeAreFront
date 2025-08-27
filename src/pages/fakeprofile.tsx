import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGlobe,
  FaEnvelope,
  FaShareAlt,
  FaStar,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

interface Person {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  coverPhoto?: string;
}

const FakeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const person = location.state?.person;

  useEffect(() => {
    if (!person) {
      navigate("/categories");
    }
  }, [person, navigate]);

  if (!person) return null;

  return (
    <div className="min-h-screen bg-white relative pb-24">
      {/* Header con flecha de regreso a Categories */}
      <Header>
        <button 
          onClick={() => navigate("/categories")}
          className="absolute left-4 flex items-center text-blue-600"
        >
          <ArrowLeft size={20} className="mr-1" />
          Volver
        </button>
      </Header>

      <main className="flex flex-col items-center shadow-md rounded-2xl p-4 pb-24 relative bg-white max-w-md mx-auto">
        {/* Portada */}
        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{
              backgroundImage: `url(${person.coverPhoto || "/default-cover.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderBottomLeftRadius: "70% 30%",
              borderBottomRightRadius: "70% 30%",
            }}
          />
        </div>

        {/* Foto de perfil */}
        <div className="relative -mt-16 z-10">
          <img
            src={person.photoUrl || "https://i.pinimg.com/736x/b1/6c/f3/b16cf30a73e39f9b8819bd9b61ff6b09.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
          />
        </div>

        {/* Nombre, profesión y estrellas */}
        <div className="w-full flex flex-col items-center mt-2">
          <h2 className="text-xl font-semibold text-center">{person.name || "Nombre desconocido"}</h2>
          <div className="w-full max-w-[200px] mt-1 flex justify-between px-2">
            <p className="text-gray-600 text-sm">{person.title || "Profesión no especificada"}</p>
            <div className="flex items-center text-yellow-500">
              <FaStar className="text-sm" />
              <span className="ml-1 text-gray-700 font-semibold text-xs">4.9</span>
            </div>
          </div>
        </div>

        {/* Reseñas y Seguidores */}
        <div className="w-full px-6 mt-4">
          <div className="flex items-center justify-between">
            <button
              className="bg-black text-white px-4 py-1 rounded-full shadow hover:bg-gray-900 text-sm"
              onClick={() => alert("Funcionalidad no implementada")}
            >
              Reseñas
            </button>
            <div className="text-center text-gray-600 text-sm">
              <p className="font-semibold text-lg">200</p>
              <p>(seguidores)</p>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center gap-3 my-6">
          <div className="flex gap-4">
            <IconBtn icon={<FaInstagram size={20} />} />
            <IconBtn icon={<FaFacebook size={20} />} />
            <IconBtn icon={<FaMapMarkerAlt size={20} />} />
          </div>
          <div className="flex gap-4">
            <IconBtn icon={<FaWhatsapp size={20} />} />
            <IconBtn icon={<FaGlobe size={20} />} />
            <IconBtn icon={<FaEnvelope size={20} />} />
            <IconBtn icon={<FaShareAlt size={20} />} />
          </div>
        </div>

        {/* Bio */}
        <div className="w-full px-6">
          <p className="text-sm text-gray-700 text-center">
            {person.bio || "Este usuario aún no ha escrito una biografía."}
          </p>
        </div>

        {/* Galería */}
        <div className="w-full px-6 mt-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-red-600">Fotos</p>
            <p className="text-xs text-gray-500">(máximo 5 imágenes)</p>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {["src/cn/cn1.png", "src/cn/cn2.png", "src/cn/cn3.png"].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery ${index}`}
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="w-full flex justify-around mt-6 px-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 text-sm"
            onClick={() => navigate("/calendar", { state: { person } })}
          >
            Agendar cita
          </button>
       <button
  className="bg-black text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 text-sm"
  onClick={() => navigate("/chat", { state: { person } })}
>
  Enviar mensaje
</button>

        </div>
      </main>

      {/* BottomNav */}
      <div className="absolute bottom-0 w-full">
        <BottomNav />
      </div>
    </div>
  );
};

const IconBtn = ({ icon }: { icon: JSX.Element }) => (
  <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition">
    {icon}
  </div>
);

export default FakeProfile;
