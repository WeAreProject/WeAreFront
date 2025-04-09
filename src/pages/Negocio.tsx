import { useState, useEffect } from "react";
import { fetchBusinessData } from "../actions/business";
import { getServicesByBusinessId } from "../actions/services";
import ServiceModal from "../components/ServiceModal";
import Header from "../components/Header";
import { geocodeAddress } from "../utils/geocoding";
import { Business } from "../types/business";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Negocio = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const getBusinessData = async () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("No user data found");
        setLoading(false);
        return;
      }

      const { id } = JSON.parse(userData);

      try {
        // Obtener negocio
        const businessData = await fetchBusinessData(id);
        setBusiness(businessData);

        // Obtener coordenadas
        const address = `${businessData.street}, ${businessData.neighborhood}, ${businessData.city}, ${businessData.state}, ${businessData.country}`;
        const coords = await geocodeAddress(address);
        setCoordinates(coords);

        // Obtener servicios por business_id
        try {
          const servicesData = await getServicesByBusinessId(businessData.id);
          setServices(servicesData);
        } catch (error) {
          console.log("No hay servicios registrados para este negocio");
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      } finally {
        setLoading(false);
      }
    };

    getBusinessData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">No se encontró información del negocio.</div>
      </div>
    );
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

        {/* Sección de Servicios */}
        <section className="mt-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Servicios</h3>
          {services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No hay servicios registrados aún.</p>
              <p className="text-gray-500 mt-2">Puedes agregar servicios desde el panel de administración.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <h4 className="text-xl font-semibold text-gray-800">{service.service_name}</h4>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <p className="text-purple-600 font-semibold mt-2">${service.price}</p>
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
      </main>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Negocio;