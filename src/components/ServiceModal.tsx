import React from "react";

interface ServiceModalProps {
  service: { 
    service_name: string; 
    category: string; 
    price: number | string; 
    description: string; 
    image: string; 
  };
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative overflow-hidden">
        

        {/* Imagen del servicio */}
        <div className="w-full h-48 mb-6 overflow-hidden rounded-xl">
          <img 
            src={service.image} 
            alt={service.service_name} 
            className="w-full h-full object-cover transition-all duration-300 transform hover:scale-110"
          />
        </div>

        {/* Nombre y categoría */}
        <h2 className="text-2xl font-semibold text-gray-800">{service.service_name}</h2>
        <p className="text-lg text-gray-500 mt-1">{service.category}</p>

        {/* Precio */}
        <p className="text-lg font-bold text-purple-700 mt-4">
          ${Number(service.price).toFixed(2)}
        </p>

        {/* Descripción */}
        <p className="text-gray-600 mt-4">{service.description}</p>

        {/* Botones */}
        <div className="mt-6 flex justify-between">
          <button 
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition-all duration-200"
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-all duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
