import React from "react";

interface ServiceModalProps {
  service: { name: string; price: string; image: string };
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* Imagen del servicio */}
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-700 mt-2">Price: {service.price}</p>
        <p className="text-gray-600 mt-2">
          Get the best service for your needs with our professional team.
        </p>

        <div className="mt-4 flex justify-end">
          <button 
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Close
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
