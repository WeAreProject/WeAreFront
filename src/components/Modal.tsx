import * as React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { ServiceWithBusiness } from "../types/service";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceWithBusiness | null;
  onPurchase: (service: ServiceWithBusiness) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, service, onPurchase }) => {
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (!isOpen) setNotification(null);
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handlePurchase = () => {
    try {
      onPurchase(service);
      setNotification({ type: 'success', message: '¡Producto comprado exitosamente!' });
      setTimeout(onClose, 1500);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al realizar la compra' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/default-service.png";
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        {notification && (
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          } flex items-center space-x-2`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        )}

        <button className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{service.service_name}</h2>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border">
              <img src={service.provider.image} alt={service.provider.name} className="w-full h-full object-cover" onError={handleImageError}/>
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
            <p className="text-sm text-gray-500">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold">${service.price}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors" onClick={handlePurchase}>
            Comprar Servicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
