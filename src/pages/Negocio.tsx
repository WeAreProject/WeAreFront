import { useState } from "react";
import ServiceModal from "../components/ServiceModal";

const Negocio = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const services = [
    { name: "Web Development", price: "$75/hr", image: "/images/web-development.jpg" },
    { name: "Mobile Development", price: "$85/hr", image: "/images/mobile-development.jpg" },
    { name: "SEO Optimization", price: "$95/hr", image: "/images/seo-optimization.jpg" }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-12 lg:p-16">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 lg:p-16 rounded-xl shadow-lg">
        {/* Image Placeholder */}
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-300 flex items-center justify-center rounded-lg mb-6">
          <span className="text-gray-600 text-lg sm:text-xl">Image</span>
        </div>

        {/* Description */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Professional Photography Session</h2>
        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          Capture your special moments with our professional photography session. Our
          experienced photographers will provide high-quality images that you will
          cherish for a lifetime.
        </p>

        {/* Key Benefits */}
        <ul className="list-disc ml-6 sm:ml-8 mt-4 text-gray-600 text-base sm:text-lg space-y-2">
          <li>High-resolution images</li>
          <li>Customizable sessions</li>
          <li>Professional equipment</li>
        </ul>

        {/* Customer Reviews */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
          <div className="text-yellow-500">★★★★★</div>
          <p className="text-gray-600 text-sm">Absolutely amazing experience! The pictures turned out beautifully.</p>
          <div className="text-yellow-500 mt-2">★★★★☆</div>
          <p className="text-gray-600 text-sm">Great service, very professional. Highly recommended.</p>
        </div>

        {/* Buttons */}
        <div className="mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-all">
            WhatsApp
          </button>
        </div>
      </main>

      {/* Services */}
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

      {/* Location */}
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
