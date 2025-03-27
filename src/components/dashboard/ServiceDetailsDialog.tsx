import { QrCode, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Customer {
  id: number;
  full_name: string;
  email: string;
  username: string;
  image: string;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  client: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  status: "pending" | "ongoing" | "completed" | "canceled";
  payment: "paid" | "pending" | "refunded";
  earnings?: number;
  customer_id: number;
}

interface ServiceDetailsDialogProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceDetailsDialog = ({ service, onClose }: ServiceDetailsDialogProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!service?.customer_id) return;
      try {
        const response = await fetch(`https://rest-api-weare-production.up.railway.app/api/customers/${service.customer_id}`);
        if (!response.ok) throw new Error('Error fetching customer');
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [service?.customer_id]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Detalles del Servicio</h2>
        <div className="grid gap-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
              <img
                src={customer?.image || "https://via.placeholder.com/150"}
                alt={customer?.full_name || "Cliente"}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.category}</p>
              <div className="flex space-x-2 mt-2">
                <span className="px-2 py-1 text-xs font-semibold rounded border bg-gray-100">
                  {service.status}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded border bg-gray-100">
                  {service.payment}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Información del Cliente</h4>
            <p className="text-sm"><span className="font-medium">Nombre:</span> {customer?.full_name || "Cargando..."}</p>
            <p className="text-sm"><span className="font-medium">Email:</span> {customer?.email || "Cargando..."}</p>
            <p className="text-sm"><span className="font-medium">Usuario:</span> {customer?.username || "Cargando..."}</p>
          </div>

          {service.status === "completed" && (
            <div>
              <h4 className="text-sm font-medium mb-2">Calificación y Reseña</h4>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(5.0)</span>
              </div>
              <p className="text-sm mt-2">"Excelente servicio! Muy profesional y entrega puntual."</p>
            </div>
          )}

          <div className="flex justify-center">
            <button className="w-full p-2 border rounded bg-gray-100 flex items-center justify-center">
              <QrCode className="mr-2 h-4 w-4" /> Mostrar Código QR
            </button>
          </div>

          {service.status === "pending" && (
            <button className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-600">
              Cancelar Servicio
            </button>
          )}

          <button onClick={onClose} className="w-full mt-4 p-2 border rounded bg-gray-200 hover:bg-gray-300">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsDialog;