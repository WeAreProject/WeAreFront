import React, { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Navigate, useNavigate } from "react-router-dom";

interface Ad {
  id: number;
  title: string;
  description: string;
  image: string;
}

const topAds: Ad[] = [
  {
    id: 1,
    title: "Corte de cabello profesional",
    description: "Luce increíble con los mejores barberos de tu zona.",
    image: "src/assets/an/co.png",
  },
  {
    id: 2,
    title: "Servicio de limpieza express",
    description: "Tu casa reluciente en menos de 2 horas.",
    image: "src/assets/an/li.png",
  },
  {
    id: 3,
    title: "Clases de guitarra a domicilio",
    description: "Aprende desde cero con músicos certificados.",
    image: "src/assets/an/gui.png",
  },
  {
    id: 4,
    title: "Spa de uñas y pedicure",
    description: "Relájate con nuestro spa premium.",
    image: "src/assets/an/pa.png",
  },
  {
    id: 5,
    title: "Fotografía profesional",
    description: "Captura tus mejores momentos.",
    image: "src/assets/an/fo.png",
  },
  {
    id: 6,
    title: "Masajes relajantes",
    description: "Dile adiós al estrés.",
    image: "src/assets/an/ma.png",
  },
  {
    id: 7,
    title: "Clases de inglés personalizadas",
    description: "Aprende inglés como nunca antes.",
    image: "src/assets/an/in.png",
  },
  {
    id: 8,
    title: "Taller de mecánica rápida",
    description: "Repara tu coche sin perder tiempo.",
    image: "src/assets/an/ta.png",
  },
  {
    id: 9,
    title: "Maquillaje profesional",
    description: "Ideal para eventos y sesiones de fotos.",
    image: "src/assets/an/mp.png",
  },
  {
    id: 10,
    title: "Diseño gráfico y logos",
    description: "Haz que tu marca se vea poderosa.",
    image: "src/assets/an/xd.png",
  },
];

const Anuncios: React.FC = () => {
  const [selectedAd, setSelectedAd] = useState<number | null>(null);
const navigate = useNavigate();



  return (
    <div className="pb-16">
      <Header />
      
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Anuncios Destacados</h1>
        
        <div className="grid grid-cols-1 gap-5">
          {topAds.map((ad, index) => {
            // Primeros 3 con animación RGB circular interna
            if (index < 3) {
              const animationSpeeds = [
                "animate-[rgbPulse_2s_linear_infinite]", // Más rápido (1er lugar)
                "animate-[rgbPulse_3s_linear_infinite]", // Medio (2do lugar)
                "animate-[rgbPulse_4s_linear_infinite]", // Más lento (3er lugar)
              ];
              
              const gradientColors = [
                "from-red-500/30 via-transparent to-transparent", // 1er lugar
                "from-green-500/30 via-transparent to-transparent", // 2do lugar
                "from-blue-500/30 via-transparent to-transparent", // 3er lugar
              ];
              
              return (
                <div 
                  key={ad.id}
                  onClick={() => setSelectedAd(ad.id)}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 
                  hover:scale-[1.02] shadow-lg hover:shadow-xl cursor-pointer
                  ${selectedAd === ad.id ? 'ring-4 ring-purple-500 scale-[1.02]' : ''}`}
                >

                  {/* Fondo con animación RGB circular */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientColors[index]} ${animationSpeeds[index]} z-0`}></div>
                  
                  <div className="relative rounded-2xl overflow-hidden">
                    <div className="relative">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-48 object-cover opacity-90"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20" />
                    </div>
                    <div className="p-4 relative z-10">
                      <h2 className="text-xl font-extrabold flex items-center gap-2 text-white">
                        <span className="drop-shadow-md">🔥</span> 
                        <span className="drop-shadow-md">{ad.title}</span>
                      </h2>
                      <p className="text-sm mt-1 text-white/90">{ad.description}</p>
                    </div>
                  </div>
                </div>
              );
            }
            
            // 4to y 5to con borde RGB estático
            if (index < 5) {
              const staticColors = [
                "border-l-4 border-t-4 border-pink-500", // 4to
                "border-l-4 border-t-4 border-cyan-500", // 5to
              ];
              
              return (
                <div
                  key={ad.id}
                  onClick={() => setSelectedAd(ad.id)}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 
                  hover:scale-[1.02] bg-white ${staticColors[index-3]}
                  shadow-md hover:shadow-lg relative cursor-pointer
                  ${selectedAd === ad.id ? 'ring-2 ring-purple-500 scale-[1.02]' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent h-20" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                      <span className="text-pink-500">⭐</span> 
                      {ad.title}
                    </h2>
                    <p className="text-sm mt-1 text-gray-600">{ad.description}</p>
                  </div>
                </div>
              );
            }

            // Últimos 5 - diseño más tranquilo con efecto selección
            return (
              <div
                key={ad.id}
                onClick={() => setSelectedAd(ad.id)}
                className={`bg-white border border-gray-200 rounded-xl shadow-sm 
                overflow-hidden hover:shadow-md transition duration-300 
                hover:border-blue-300 cursor-pointer
                ${selectedAd === ad.id ? 'bg-blue-50 border-blue-400' : ''}`}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{ad.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón flotante de "Promocínate" */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => navigate("/promo")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          🌟 Promocínate
        </button>
      </div>

      <BottomNav />
      
      <style jsx global>{`
        @keyframes rgbPulse {
          0% {
            background-color: rgba(255, 0, 0, 0.3);
          }
          33% {
            background-color: rgba(0, 255, 0, 0.3);
          }
          66% {
            background-color: rgba(0, 0, 255, 0.3);
          }
          100% {
            background-color: rgba(255, 0, 0, 0.3);
          }
        }
      `}</style>
    </div>

  );
};

export default Anuncios;