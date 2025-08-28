import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

import "../index.css";
import Header from "../components/Header";
import Modal from "../components/Modal";
import BottomNav from "../components/BottomNav";
interface ServiceWithBusiness {
  id: string;
  service_name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  business_id: string;
  provider: { name: string; image: string; rating: number; reviews: number };
  status: string;
  bookings: number;
  thumbnail?: string;
}

interface Profile {
  id: number;
  name: string;
  image: string;
  profession: string;
  rating: number;
}

const offers = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=600&q=80",
];

// Definimos solo 3 profesiones
const PROFESSIONS = ["Diseño y Tecnología", "Bienestar y Salud", "Hogar y Servicios"];

// Perfiles agrupados por profesión (6 por grupo)
const profilesByProfession: Record<string, Profile[]> = {
  "Diseño y Tecnología": [
    { id: 1, name: "Ana Martínez", image: "https://randomuser.me/api/portraits/women/1.jpg", profession: "Diseñadora UX/UI", rating: 4.9 },
    { id: 2, name: "Carlos López", image: "https://randomuser.me/api/portraits/men/2.jpg", profession: "Desarrollador Web", rating: 4.8 },
    { id: 3, name: "Lucía García", image: "https://randomuser.me/api/portraits/women/3.jpg", profession: "Marketing Digital", rating: 4.7 },
    { id: 4, name: "Miguel Rodríguez", image: "https://randomuser.me/api/portraits/men/4.jpg", profession: "Fotógrafo Profesional", rating: 5.0 },
    { id: 5, name: "Sofía Hernández", image: "https://randomuser.me/api/portraits/women/5.jpg", profession: "Community Manager", rating: 4.8 },
    { id: 6, name: "Andrés Torres", image: "https://randomuser.me/api/portraits/men/6.jpg", profession: "Diseñador Gráfico", rating: 4.9 },
  ],
  "Bienestar y Salud": [
    { id: 7, name: "Mariana Pérez", image: "https://randomuser.me/api/portraits/women/7.jpg", profession: "Nutricionista", rating: 4.6 },
    { id: 8, name: "José Ramírez", image: "https://randomuser.me/api/portraits/men/8.jpg", profession: "Entrenador Personal", rating: 4.7 },
    { id: 9, name: "Valentina Ruiz", image: "https://randomuser.me/api/portraits/women/9.jpg", profession: "Instructora de Yoga", rating: 4.8 },
    { id: 10, name: "Diego Fernández", image: "https://randomuser.me/api/portraits/men/10.jpg", profession: "Masajista Terapéutico", rating: 4.5 },
    { id: 11, name: "Camila Castro", image: "https://randomuser.me/api/portraits/women/11.jpg", profession: "Psicóloga", rating: 4.7 },
    { id: 12, name: "Javier Morales", image: "https://randomuser.me/api/portraits/men/12.jpg", profession: "Chef Saludable", rating: 4.9 },
  ],
  "Hogar y Servicios": [
    { id: 13, name: "Ricardo Vega", image: "https://randomuser.me/api/portraits/men/13.jpg", profession: "Electricista", rating: 4.7 },
    { id: 14, name: "Laura Mendoza", image: "https://randomuser.me/api/portraits/women/14.jpg", profession: "Plomera", rating: 4.8 },
    { id: 15, name: "Oscar Duarte", image: "https://randomuser.me/api/portraits/men/15.jpg", profession: "Carpintero", rating: 4.6 },
    { id: 16, name: "Isabel Ríos", image: "https://randomuser.me/api/portraits/women/15.jpg", profession: "Organizadora Profesional", rating: 4.9 },
    { id: 17, name: "Fernando Soto", image: "https://randomuser.me/api/portraits/men/16.jpg", profession: "Jardinero", rating: 4.5 },
    { id: 18, name: "Gabriela Luna", image: "https://randomuser.me/api/portraits/women/16.jpg", profession: "Limpieza Profesional", rating: 4.8 },
  ]
};

// Definir categorías de servicios
const SERVICE_CATEGORIES = ["Belleza", "Hogar", "Bienestar", "Tecnología", "Educación", "Deporte", "Legal", "Eventos", "Gastronomía"];

const LOCAL_STORAGE_PURCHASES_KEY = "user_purchases";
const LOCAL_STORAGE_USER_KEY = "user";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithBusiness | null>(null);
  const [services, setServices] = useState<ServiceWithBusiness[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<Record<string, ServiceWithBusiness[]>>({});
  const [userName, setUserName] = useState("Usuario");
  const [currentOffer, setCurrentOffer] = useState(0);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({
    "Diseño y Tecnología": 0,
    "Bienestar y Salud": 0,
    "Hogar y Servicios": 0
  });
  const [serviceScrollPositions, setServiceScrollPositions] = useState<Record<string, number>>({});

  // Cargar datos del usuario
  useEffect(() => {
    let userStr = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!userStr) {
      const fakeUser = {
        id: "1",
        name: "Usuario Demo",
        email: "demo@weare.com",
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fakeUser));
      userStr = JSON.stringify(fakeUser);
    }
    const user = JSON.parse(userStr);
    setUserName(user.name || "Usuario");
  }, []);

  // Carrusel automático de ofertas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cargar servicios y agruparlos por categoría
  useEffect(() => {
    const dummyServices: ServiceWithBusiness[] = [
      {
        id: "1",
        service_name: "Corte de Cabello",
        description: "Corte profesional para hombre y mujer",
        price: 150,
        category: "Belleza",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
        business_id: "101",
        provider: { name: "Barbería Premium", image: "", rating: 4.5, reviews: 120 },
        status: "active",
        bookings: 0,
      },
      {
        id: "2",
        service_name: "Limpieza de Casa",
        description: "Servicio completo de limpieza",
        price: 300,
        category: "Hogar",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        business_id: "102",
        provider: { name: "CleanPro", image: "", rating: 4.8, reviews: 200 },
        status: "active",
        bookings: 0,
      },
      {
        id: "3",
        service_name: "Clases de Yoga",
        description: "Sesiones de yoga para todos los niveles",
        price: 200,
        category: "Bienestar",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        business_id: "103",
        provider: { name: "Yoga Center", image: "", rating: 4.9, reviews: 80 },
        status: "active",
        bookings: 0,
      },
      {
        id: "4",
        service_name: "Reparación de Computadoras",
        description: "Solución rápida a problemas técnicos",
        price: 250,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=600&q=80",
        business_id: "104",
        provider: { name: "TechSolutions", image: "", rating: 4.7, reviews: 95 },
        status: "active",
        bookings: 0,
      },
      {
        id: "5",
        service_name: "Clases de Inglés",
        description: "Aprende inglés con profesores certificados",
        price: 180,
        category: "Educación",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
        business_id: "105",
        provider: { name: "EnglishPro", image: "", rating: 4.6, reviews: 150 },
        status: "active",
        bookings: 0,
      },
      {
        id: "6",
        service_name: "Entrenamiento Personal",
        description: "Rutinas de ejercicio personalizadas",
        price: 350,
        category: "Deporte",
        image: "https://images.unsplash.com/photo-1594737625785-c0f3c5ff9b5e?auto=format&fit=crop&w=600&q=80",
        business_id: "106",
        provider: { name: "FitLife", image: "", rating: 4.9, reviews: 180 },
        status: "active",
        bookings: 0,
      },
      {
        id: "7",
        service_name: "Asesoría Legal",
        description: "Consultoría legal especializada",
        price: 500,
        category: "Legal",
        image: "https://images.unsplash.com/photo-1589927986089-35812388d1c6?auto=format&fit=crop&w=600&q=80",
        business_id: "107",
        provider: { name: "LawExperts", image: "", rating: 4.7, reviews: 60 },
        status: "active",
        bookings: 0,
      },
      {
        id: "8",
        service_name: "Fotografía de Eventos",
        description: "Captura tus momentos especiales",
        price: 400,
        category: "Eventos",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80",
        business_id: "108",
        provider: { name: "PhotoStudio", image: "", rating: 4.8, reviews: 90 },
        status: "active",
        bookings: 0,
      },
      {
        id: "9",
        service_name: "Clases de Cocina",
        description: "Aprende recetas deliciosas paso a paso",
        price: 220,
        category: "Gastronomía",
        image: "https://images.unsplash.com/photo-1604908176997-43d4b18a1b93?auto=format&fit=crop&w=600&q=80",
        business_id: "109",
        provider: { name: "ChefMaster", image: "", rating: 4.9, reviews: 70 },
        status: "active",
        bookings: 0,
      },
      {
        id: "10",
        service_name: "Masaje Relajante",
        description: "Masaje terapéutico para aliviar tensiones",
        price: 280,
        category: "Bienestar",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
        business_id: "110",
        provider: { name: "Spa Harmony", image: "", rating: 4.8, reviews: 130 },
        status: "active",
        bookings: 0,
      },
      {
        id: "11",
        service_name: "Diseño de Logotipo",
        description: "Diseño profesional de identidad visual",
        price: 450,
        category: "Diseño",
        image: "https://images.unsplash.com/photo-1567446537738-74804ee3a9bd?auto=format&fit=crop&w=600&q=80",
        business_id: "111",
        provider: { name: "DesignStudio", image: "", rating: 4.9, reviews: 85 },
        status: "active",
        bookings: 0,
      },
    ];
    setServices(dummyServices);
    
    // Agrupar servicios por categoría
    const groupedServices: Record<string, ServiceWithBusiness[]> = {};
    dummyServices.forEach(service => {
      if (!groupedServices[service.category]) {
        groupedServices[service.category] = [];
        // Inicializar posición de scroll para esta categoría
        setServiceScrollPositions(prev => ({ ...prev, [service.category]: 0 }));
      }
      groupedServices[service.category].push(service);
    });
    setServicesByCategory(groupedServices);
  }, []);

  // Manejo modal
  const handleOpenModal = (service: ServiceWithBusiness) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Comprar servicio
  const handleBuyService = (service: ServiceWithBusiness) => {
    const purchasesStr = localStorage.getItem(LOCAL_STORAGE_PURCHASES_KEY);
    const purchases = purchasesStr ? JSON.parse(purchasesStr) : [];
    purchases.push({
      id: Date.now(),
      service_id: service.id,
      service,
      price: service.price,
      status: "pending",
      purchase_date: new Date().toISOString(),
      business: { business_name: service.provider.name },
    });
    localStorage.setItem(LOCAL_STORAGE_PURCHASES_KEY, JSON.stringify(purchases));
    alert("Compra realizada con éxito!");
  };

  // Error imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1620012253295-c15cc3b65d10?auto=format&fit=crop&w=600&q=80";
  };

  // Navegación horizontal para cada categoría de perfiles
  const scrollCategory = (profession: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-container-${profession}`);
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'right' 
        ? container.scrollLeft + scrollAmount 
        : container.scrollLeft - scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      
      setScrollPositions(prev => ({
        ...prev,
        [profession]: newPosition
      }));
    }
  };

  // Navegación horizontal para cada categoría de servicios
  const scrollServiceCategory = (category: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`service-scroll-container-${category}`);
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'right' 
        ? container.scrollLeft + scrollAmount 
        : container.scrollLeft - scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      
      setServiceScrollPositions(prev => ({
        ...prev,
        [category]: newPosition
      }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white pt-16 pb-28">
      <Header />

      {/* Bienvenida */}
      <div className="text-left px-4 mt-4">
        <h1 className="text-xl font-semibold text-gray-800">
          ¡Hola <span className="text-red-600 font-bold">{userName}</span>!
        </h1>
        <h2 className="text-xl font-bold mt-1">¿Qué buscamos hoy?</h2>
      </div>

      {/* Carrusel de Ofertas */}
      <div className="px-4 mt-4">
        <h3 className="text-base font-semibold mb-2">Super Ofertas</h3>
        <div className="relative w-full mx-auto">
          <img
            src={offers[currentOffer]}
            alt={`Oferta ${currentOffer + 1}`}
            className="w-full h-40 object-cover rounded-xl shadow-md transition-all duration-500"
            onError={handleImageError}
          />
          <button
            onClick={() => setCurrentOffer((prev) => (prev === 0 ? offers.length - 1 : prev - 1))}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentOffer((prev) => (prev + 1) % offers.length)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    {/* Botón mejores anuncios */}
<div className="px-4 mt-4 flex justify-center">
  <a
    href="/anuncios"
    className="bg-red-600 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-red-700 hover:scale-105 hover:shadow transition-all duration-300 text-sm"
  >
    🌟 ¡Ver mejores ofertas! +
  </a>
</div>


      {/* Perfiles Profesionales - Carrusel por Profesión (Estilo Instagram) */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-red-600 mb-3 px-4">Profesionales Destacados</h3>
        
        {PROFESSIONS.map((profession) => (
          <div key={profession} className="mb-6">
            <div className="flex items-center justify-between px-4 mb-2">
              <h4 className="text-sm font-semibold text-gray-800">{profession}</h4>
              <div className="flex space-x-1">
                <button 
                  onClick={() => scrollCategory(profession, 'left')}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollCategory(profession, 'right')}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div 
              id={`scroll-container-${profession}`}
              className="flex overflow-x-auto scrollbar-hide space-x-3 px-4 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {profilesByProfession[profession].map((profile) => (
                <div
                  key={profile.id}
                  className="flex-shrink-0 w-24 relative rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="rounded-full border-2 border-red-600 p-0.5">
                      <img 
                        src={profile.image} 
                        alt={profile.name} 
                        className="w-20 h-20 object-cover rounded-full mx-auto" 
                        onError={handleImageError} 
                      />
                    </div>
                    <button className="absolute top-0 right-0 bg-white/80 p-0.5 rounded-full shadow hover:bg-white">
                      <Heart className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                  <div className="mt-2 text-center">
                    <h4 className="text-xs font-bold truncate px-1">{profile.name}</h4>
                    <p className="text-xs text-gray-500 truncate px-1">{profile.profession}</p>
                    <div className="flex items-center justify-center text-yellow-400 text-xs font-semibold mt-0.5">
                      <span className="text-xs">⭐</span> {profile.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Servicios por Categoría - Carrusel para cada categoría */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-red-600 mb-3 px-4">Servicios por Categoría</h3>
        
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <div key={category} className="mb-6">
            <div className="flex items-center justify-between px-4 mb-2">
              <h4 className="text-sm font-semibold text-gray-800">{category}</h4>
              <div className="flex space-x-1">
                <button 
                  onClick={() => scrollServiceCategory(category, 'left')}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollServiceCategory(category, 'right')}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div 
              id={`service-scroll-container-${category}`}
              className="flex overflow-x-auto scrollbar-hide space-x-4 px-4 py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categoryServices.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-48 bg-white rounded-lg shadow overflow-hidden transition transform hover:-translate-y-1 hover:shadow-md"
                >
                  <img src={service.image} alt={service.service_name} className="w-full h-28 object-cover" onError={handleImageError} />
                  <div className="p-2">
                    <h4 className="text-xs font-medium truncate">{service.service_name}</h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{service.provider.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-yellow-500">⭐ {service.provider.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({service.provider.reviews})</span>
                    </div>
                    <p className="text-xs font-semibold text-green-600 mt-1">${service.price}</p>
                  <button
  className="mt-1.5 w-full bg-black text-white text-xs py-1.5 rounded hover:bg-gray-900 transition"
  onClick={() => handleOpenModal(service)}
>
  Ver detalles
</button>

                    <button
                      className="mt-1 w-full bg-red-600 text-white text-xs py-1.5 rounded hover:bg-green-700 transition"
                      onClick={() => handleBuyService(service)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} service={selectedService} onPurchase={handleBuyService} />
      <BottomNav />
    </div>
  );
};

export default HomePage;