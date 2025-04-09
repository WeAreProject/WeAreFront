import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../actions/services";
import { getServicesByBusinessId } from "../actions/services";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Star } from "lucide-react";
import { geocodeAddress } from "../utils/geocoding";

const BusinessDetails = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [business, setBusiness] = useState<any | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!businessId) return;

      try {
        // Obtener negocio
        const businessData = await getBusinessById(parseInt(businessId));
        setBusiness(businessData);

        // Obtener coordenadas
        const address = `${businessData.street}, ${businessData.neighborhood}, ${businessData.city}, ${businessData.state}, ${businessData.country}`;
        const coords = await geocodeAddress(address);
        setCoordinates(coords);

        // Obtener servicios por business_id
        const servicesData = await getServicesByBusinessId(parseInt(businessId));
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching business data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  const handleOpenModal = (service: any) => {
    const formattedService = {
      ...service,
      provider: {
        name: business.business_name,
        image: business.image,
        rating: 4.5,
        reviews: 150
      }
    };
    setSelectedService(formattedService);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return <div className="text-center text-gray-600">Cargando...</div>;
  }

  if (!business) {
    return <div className="text-center text-red-500">No se encontró información del negocio.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-12 lg:p-16">
      <Header />
      <main className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl shadow-xl">
        {/* Imagen del negocio */}
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-300 flex items-center justify-center rounded-lg mb-6 overflow-hidden">
          <img src={business.image} alt={business.business_name} className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Información del negocio */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{business.business_name}</h2>
          <p className="text-lg sm:text-xl text-gray-600">{business.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Ubicación</h3>
              <p className="text-gray-600">{`${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}`}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Teléfono</h3>
              <p className="text-gray-600">{business.phone}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">{business.email}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Horario de Operación</h3>
              <p className="text-gray-600">{business.operation_hours}</p>
            </div>
          </div>
        </div>

        {/* Reseñas de clientes */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-2">Reseñas de clientes</h3>
          <div className="text-yellow-500">★★★★★</div>
          <p className="text-gray-600 text-sm mt-2">Absolutely amazing experience! The pictures turned out beautifully.</p>
        </div>

        {/* WhatsApp Button */}
        <div className="mt-6">
          <a 
            href={`https://wa.me/${business.phone}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all w-full sm:w-auto inline-block text-center"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </main>

      {/* Servicios */}
      <section className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Servicios</h3>
        {services.length === 0 ? (
          <p className="text-gray-600 text-center">No hay servicios disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div 
                    className="flex items-center space-x-3 mb-2"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                      <img
                        src={business.image}
                        alt={business.business_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{business.business_name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 ml-1" />
                        <span>4.5 (150)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{service.service_name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm font-medium pt-2">
                    <span>${service.price}</span>
                  </div>

                  <button 
                    className="w-full py-2 text-center bg-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition"
                    onClick={() => handleOpenModal(service)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección del Mapa */}
      <section className="mt-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ubicación</h3>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="aspect-video w-full">
            {coordinates ? (
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01},${coordinates.lat - 0.01},${coordinates.lon + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Cargando mapa...</p>
              </div>
            )}
          </div>
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h4>
            <p className="text-gray-600">{`${business.street}, ${business.neighborhood}, ${business.city}, ${business.state}, ${business.country}`}</p>
          </div>
        </div>
      </section>

      {isModalOpen && selectedService && (
        <Modal
          service={selectedService}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default BusinessDetails;
