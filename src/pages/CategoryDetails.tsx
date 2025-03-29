import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { getCategoryDetails, Business as APIBusiness, Service as APIService } from "../actions/categories";
import { Service, ServiceWithBusiness } from "../types/service";

const CategoryDetails = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<{ businesses: APIBusiness[]; services: Service[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithBusiness | null>(null);

  const transformAPIServiceToService = (apiService: APIService): Service => ({
    id: apiService.id.toString(),
    name: apiService.service_name,
    description: apiService.description,
    price: parseFloat(apiService.price),
    category: apiService.category,
    thumbnail: apiService.image,
    status: "active",
    bookings: 0,
    business_id: apiService.business_id,
    service_name: apiService.service_name,
    image: apiService.image,
    created_at: apiService.created_at,
    updated_at: apiService.updated_at,
    provider: apiService.provider,
  });

  const handleOpenModal = (service: Service) => {
    const serviceWithBusiness: ServiceWithBusiness = {
      ...service,
      provider: {
        name: service.provider?.name || "Provider Name",
        image: service.provider?.image || service.thumbnail?.toString() || "",
        rating: service.provider?.rating || 4.5,
        reviews: service.provider?.reviews || 100,
      },
      business_id: service.business_id || 1,
      service_name: service.name,
      image: service.thumbnail?.toString() || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSelectedService(serviceWithBusiness);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!categoryName) return;
      
      try {
        const data = await getCategoryDetails(categoryName);
        setDetails({
          businesses: data.businesses,
          services: data.services.map(transformAPIServiceToService),
        });
      } catch (err) {
        setError("Error al cargar los detalles de la categoría");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [categoryName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Cargando detalles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-12 pt-16">
      <Header />
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          {categoryName}
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Explora negocios y servicios en esta categoría
        </p>
      </section>

      {/* Sección de Negocios */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Negocios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details?.businesses.map((business) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="service-card bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/business/${business.id}`)}
            >
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden bg-gray-200">
                <img
                  src={business.image || 'https://via.placeholder.com/400x300'}
                  alt={business.business_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg hover:text-purple-600">{business.business_name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>4.5</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">{business.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details?.services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="service-card bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden bg-gray-200">
                <img
                  src={service.image || service.thumbnail?.toString() || 'https://via.placeholder.com/400x300'}
                  alt={service.service_name || service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                {service.provider && (
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/business/${service.business_id}`);
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                      <img
                        src={service.provider.image}
                        alt={service.provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold hover:text-purple-600">{service.provider.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{service.provider.rating} ({service.provider.reviews})</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg">{service.service_name || service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm font-medium">
                  <span>${service.price}</span>
                </div>

                <button 
                  className="w-full py-2 text-center bg-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition"
                  onClick={() => handleOpenModal(service)}
                >
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {isModalOpen && selectedService && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default CategoryDetails; 