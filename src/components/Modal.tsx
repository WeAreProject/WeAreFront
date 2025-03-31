import * as React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { createPurchase } from "../actions/purchases";
import { Service } from "../types/service";

interface ServiceWithBusiness extends Service {
  provider: {
    name: string;
    image: string;
    rating: number;
    reviews: number;
  };
  business_id: number;
  service_name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceWithBusiness | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, service }) => {
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setNotification(null);
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handlePurchase = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        setNotification({
          type: 'error',
          message: 'No se encontró la información del usuario'
        });
        return;
      }

      const userData = JSON.parse(userDataString);
      const customerId = userData.id;

      if (!customerId) {
        setNotification({
          type: 'error',
          message: 'No se encontró el ID del cliente'
        });
        return;
      }

      console.log('Intentando crear compra para usuario:', customerId);
      const purchaseData = {
        customer_id: customerId,
        service_id: Number(service.id),
        business_id: service.business_id,
        price: Number(service.price)
      };
      console.log('Datos de la compra:', purchaseData);

      await createPurchase(purchaseData);

      setNotification({
        type: 'success',
        message: '¡Producto comprado exitosamente!'
      });
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al crear la compra:', error);
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error al realizar la compra'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        {notification && (
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          } flex items-center space-x-2`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        <button
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{service.service_name}</h2>
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
            onClick={handlePurchase}
          >
            Comprar Servicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
