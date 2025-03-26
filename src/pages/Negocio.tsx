import { useState, useEffect } from "react";
import { fetchBusinessData } from "../actions/business";
import { getServicesByBusinessId } from "../actions/services"; // Importar función para obtener servicios
import ServiceModal from "../components/ServiceModal";

const Negocio = () => {
  const [business, setBusiness] = useState<any | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
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
          <p className="text-center text-gray-500">No hay servicios disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out"
                onClick={() => setSelectedService(index)}
              >
                <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
                  <img src={service.image} alt={service.service_name} className="w-full h-full object-cover" />
                </div>
                <p className="text-lg font-medium text-gray-800">{service.service_name}</p>
                <p className="text-gray-700 mt-2">
                  Price: <span className="font-bold text-purple-700">${Number(service.price).toFixed(2)}</span>
                </p>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg mt-4 shadow-md w-full"
                  onClick={() => setSelectedService(index)}
                >
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ubicación */}
      <section className="max-w-5xl mx-auto mt-12 p-6 sm:p-8 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ubicación</h3>
        <div className="w-full h-48 sm:h-56 md:h-72 bg-gray-300 flex items-center justify-center rounded-lg">
          <span className="text-gray-600 text-lg sm:text-xl">Google Maps Placeholder</span>
        </div>
      </section>

      {/* Modal */}
      {selectedService !== null && (
        <ServiceModal 
          service={services[selectedService]} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
};

export default Negocio;
