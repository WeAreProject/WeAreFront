import { useState, useEffect } from 'react';
import { Star, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import AddExperienceModal from '../components/AddExperienceModal';
import { fetchOwner } from '../actions/owners';

interface Owner {
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
    title: "Web Development",
    description: "Front-end development and UI/UX implementation",
    price: "$75/hr",
  },
  {
    id: 3,
    title: "Web Development",
    description: "Backend development and API integration",
    price: "$75/hr",
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
      const userData = localStorage.getItem("user");
      console.log("userData:", userData);  // Verifica que los datos están en localStorage
      if (!userData) {
        console.error("No user data found");
        setLoading(false);
        return;
      }
  
      const { id } = JSON.parse(userData);
      setLoading(true); // Empieza a cargar los datos
  
      try {
        const data = await fetchOwner(id);
        console.log("Fetched data:", data); // Verifica los datos obtenidos
        if (data) {
          setOwner(data);
          console.log("Owner state:", data); // Verifica que el estado se actualiza
        } else {
          console.log("No se pudo obtener los datos del dueño");
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadOwner();
  }, []);
  
  if (loading) {
    return <div className="text-center text-gray-600">Cargando...</div>;
  }
  
  if (!owner) {
    return <div className="text-center text-red-500">No se pudo cargar el perfil.</div>;
  }
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-12 pt-12">
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Imagen del usuario */}
          <img
            src={owner.image || "/path/to/default-image.jpg"}
            alt={owner.name}
            className="w-24 h-24 rounded-full object-cover bg-gray-200"
          />
  
          <div className="flex-1">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold">{owner.name}</h1>
                <p className="text-lg text-gray-600">{owner.email}</p>
                <p className="text-lg text-gray-600">{owner.phone}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.0)</span>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
                <Upload className="w-4 h-4 mr-2" />
                Upload CV
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="space-y-6">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            + Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {workExperience.map((work, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-600"
            >
              <h3 className="font-semibold">{work.title}</h3>
              <p className="text-sm text-gray-600">{work.period}</p>
              <p className="mt-2 text-gray-600">{work.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">My Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-purple-600">{service.price}</span>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Ubicación</h2>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889519!2d-58.381592!3d-34.603722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf9a1e56e3%3A0x3fdbd4e7e1f9e8a9!2sObelisco!5e0!3m2!1ses-419!2sar!4v1648123456789!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h4>
            <p className="text-gray-600">San Francisco Bay Area</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Client Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <span className="font-medium">{review.client}</span>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <AddExperienceModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Profile;