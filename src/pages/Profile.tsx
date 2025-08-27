import { useState, useEffect } from 'react';
import { Star, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AddExperienceModal from '../components/AddExperienceModal';
import BottomNav from "../components/BottomNav";

interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

const workExperience = [
  {
    title: "Senior Developer - Tech Corp",
    period: "2020 - Present",
    description: "Led development of multiple enterprise applications and mentored junior developers.",
  },
  {
    title: "Full Stack Developer - Startup Inc",
    period: "2018 - 2020",
    description: "Developed and maintained various web applications using modern technologies.",
  },
];

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Full-stack development and maintenance of web applications",
    price: "$75/hr",
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Front-end development and UI/UX implementation",
    price: "$65/hr",
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Backend development and API integration",
    price: "$70/hr",
  },
];

const reviews = [
  {
    id: 1,
    client: "Sarah Johnson",
    rating: 5,
    comment: "Excellent work! Very collaborative and delivered on time.",
  },
  {
    id: 2,
    client: "Michael Chen",
    rating: 4,
    comment: "Great communication and quality work.",
  },
  {
    id: 3,
    client: "Emily Davis",
    rating: 5,
    comment: "Exceptional skills and very professional. Will hire again.",
  },
];

// Función simulada para obtener datos del propietario
const fetchOwner = async (userData: any): Promise<Owner> => {
  // Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Devolvemos los datos del usuario desde localStorage o valores por defecto
  return {
    id: userData.id || "1",
    name: userData.name || "Usuario Demo",
    email: userData.email || "demo@example.com",
    phone: userData.phone || "+1 234 567 8900",
    image: userData.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  };
};

const Profile = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadOwner = async () => {
      // Verificamos si hay datos de usuario en localStorage
      let userData = null;
      try {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          userData = JSON.parse(storedData);
          console.log("Datos de usuario encontrados:", userData);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }

      // Si no hay datos en localStorage, creamos unos por defecto
      if (!userData) {
        userData = { 
          id: "1", 
          name: "Usuario Demo", 
          email: "demo@example.com",
          phone: "+1 234 567 8900",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Usuario demo creado:", userData);
      }

      setLoading(true);

      try {
        // Usamos la función simulada con los datos del usuario
        const data = await fetchOwner(userData);
        setOwner(data);
        console.log("Datos del propietario cargados:", data);
      } catch (error) {
        console.error("Error loading owner data:", error);
        // En caso de error, creamos un usuario por defecto
        setOwner({
          id: "1",
          name: "Usuario Demo",
          email: "demo@example.com",
          phone: "+1 234 567 8900",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
        });
      } finally {
        setLoading(false);
      }
    };

    loadOwner();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-500">
          <p>No se pudo cargar el perfil.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-12 pt-12 bg-gray-100">
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Imagen del usuario */}
          <img
            src={owner.image}
            alt={owner.name}
            className="w-32 h-32 rounded-full object-cover bg-gray-200 border-4 border-purple-100"
            onError={(e) => {
              // Si la imagen falla, usamos una por defecto
              e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80";
            }}
          />

          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{owner.name}</h1>
                <p className="text-lg text-gray-600">{owner.email}</p>
                <p className="text-lg text-gray-600">{owner.phone}</p>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition">
                <Upload className="w-4 h-4 mr-2" />
                Subir CV
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="space-y-6">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-800">Experiencia Laboral</h2>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            + Añadir Experiencia
          </button>
        </div>
        <div className="space-y-4">
          {workExperience.map((work, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-600 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800">{work.title}</h3>
              <p className="text-sm text-gray-600">{work.period}</p>
              <p className="mt-2 text-gray-600">{work.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Mis Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-800">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-600">{service.price}</span>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                  Contratar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reseñas de Clientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                  {review.client.charAt(0)}
                </div>
                <span className="font-medium text-gray-800">{review.client}</span>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <AddExperienceModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <BottomNav />
    </div>
  );
};

export default Profile;