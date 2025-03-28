import { useState, useEffect } from "react";
import { fetchBusinessData } from "../actions/business";
import { getServicesByBusinessId } from "../actions/services";
import ServiceModal from "../components/ServiceModal";
import Header from "../components/Header";
const Negocio = () => {
  const [business, setBusiness] = useState<any | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

        // Obtener servicios por business_id
        const servicesData = await getServicesByBusinessId(businessData.id);
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getBusinessData();
  }, []);

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
              <h3 className="text-xl font-semibold text-gray-800">Location</h3>
              <p className="text-gray-600">{business.location}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">{business.phone}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">{business.email}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Operation_Hours</h3>
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
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all w-full sm:w-auto">
            WhatsApp
          </button>
        </div>
      </main>

      {/* Servicios dinámicos */}
      <section className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Servicios</h3>
        {services.length === 0 ? (
          <p className="text-gray-600 text-center">No hay servicios disponibles.</p>
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