import React from "react";
import { X } from "lucide-react";

interface Service {
  id: number;
  business_id: number;
  service_name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface Business {
  id: number;
  business_name: string;
  image: string;
}

interface ServiceWithBusiness extends Service {
  provider: {
    name: string;
    image: string;
    rating: number;
    reviews: number;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceWithBusiness | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{service.service_name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {service.description}
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border">
              <img
                src={service.provider.image}
                alt={service.provider.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{service.provider.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{service.provider.rating}</span>
                <span className="mx-1">•</span>
                <span>{service.provider.reviews} reviews</span>
              </div>
              <p className="text-sm text-gray-500">{service.category}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              {service.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold">${service.price}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            onClick={onClose}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
