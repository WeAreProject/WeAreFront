import { QrCode, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../../types/service";

interface Customer {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  created_at: string;
}

interface ServiceDetailsDialogProps {
  onClose: () => void;
  service: Service | null;
}

const ServiceDetailsDialog = ({ onClose, service }: ServiceDetailsDialogProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (service?.customer_id) {
      setTimeout(() => {
        setCustomer({
          id: service.customer_id!,
          name: "John Doe",
          avatar: "/avatar.jpg",
          email: "john@example.com",
          phone: "+1234567890",
          created_at: "2024-01-01",
        });
      }, 500);
    }
  }, [service]);

  const handleBuyService = () => {
    if (service) {
      navigate("/payment-methods", {
        state: {
          serviceName: service.name,
          price: service.price,
        },
      });
    }
  };

  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-sm text-gray-500">{service.category}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {customer ? (
            <>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{service.status}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${service.price}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Service Details</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleBuyService}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Comprar Servicio
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsDialog;
