import { useState, useEffect } from 'react';
import { fetchBusinessData } from '../actions/business';  // Importar la función de acción
import ServiceModal from "../components/ServiceModal";

const Negocio = () => {
  const [business, setBusiness] = useState<any | null>(null); // Aquí almacenamos la información de negocio
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Servicios de ejemplo (puedes sustituir por datos dinámicos si los tienes)
  const services = [
    { name: "Web Development", price: "$75/hr", image: "/images/web-development.jpg" },
    { name: "Mobile Development", price: "$85/hr", image: "/images/mobile-development.jpg" },
    { name: "SEO Optimization", price: "$95/hr", image: "/images/seo-optimization.jpg" }
  ];

  useEffect(() => {
    const getBusinessData = async () => {
      // Obtener el ID del usuario logueado desde el localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        console.error("No user data found");
        return;
      }

      const { id } = JSON.parse(userData); // Obtener el ID del usuario desde el JSON almacenado

      // Llamar a la función para obtener los datos del negocio
      const data = await fetchBusinessData(id);  // Usamos el ID del usuario para obtener los datos del negocio
      setBusiness(data);  // Actualizar el estado con los datos de negocio
    };

    getBusinessData();
  }, []);  // El array vacío asegura que solo se ejecute una vez cuando el componente se monte.

  if (!business) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los datos están siendo obtenidos
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-12 lg:p-16">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl shadow-lg">
        {/* Imagen del negocio */}
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-300 flex items-center justify-center rounded-lg mb-6">
          <img src={business.image} alt={business.business_name} className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Descripción */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{business.business_name}</h2>
        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          {business.description}
        </p>
        {/* Email */}

        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          {business.location}
        </p>

        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          {business.phone}
        </p>

        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          {business.email}
        </p>
        
        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          {business.operation_hours}
        </p>

        

        {/* Reseñas de clientes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
          <div className="text-yellow-500">★★★★★</div>
          <p className="text-gray-600 text-sm">Absolutely amazing experience! The pictures turned out beautifully.</p>
        </div>

        {/* Botones */}
        <div className="mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-all">
            WhatsApp
          </button>
        </div>
      </main>

      {/* Servicios */}
      <section className="max-w-5xl mx-auto mt-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all ${selectedService === index ? 'border-4 border-purple-600' : ''}`} 
              onClick={() => setSelectedService(index)}
            >
              <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-300 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-700 text-base sm:text-lg font-medium">{service.name}</p>
              <p className="text-purple-700 font-bold text-lg sm:text-xl">{service.price}</p>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg mt-4 shadow-md transition-all w-full"
                onClick={() => setSelectedService(index)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-8 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Location</h3>
        <div className="w-full h-40 sm:h-56 md:h-72 bg-gray-300 flex items-center justify-center rounded-lg">
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
