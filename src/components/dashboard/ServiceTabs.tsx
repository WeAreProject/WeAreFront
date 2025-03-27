import { useState, useEffect } from "react";
import { getPurchasesByBusinessId, getServiceById, getBusinessByOwnerId } from "../../actions/services";
import { Clock, Calendar } from "lucide-react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";

interface Service {
  id: number;
  service_name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface Purchase {
  id: number;
  customer_id: number;
  service_id: number;
  business_id: number;
  status: string;
  purchase_date: string;
  price: string;
}

interface ServiceWithDetails extends Purchase {
  serviceDetails?: Service;
}

const ServiceList = ({ status }: { status: string }) => {
  const [services, setServices] = useState<ServiceWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceWithDetails | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (!userData.id) return;

        const businesses = await getBusinessByOwnerId(userData.id);
        if (!businesses || businesses.length === 0) return;

        const businessId = businesses[0].id;
        const purchases = await getPurchasesByBusinessId(businessId);
        const filteredPurchases = purchases.filter(p => p.status === status);

        // Obtener detalles de cada servicio
        const servicesWithDetails = await Promise.all(
          filteredPurchases.map(async (purchase) => {
            try {
              const serviceDetails = await getServiceById(purchase.service_id);
              return {
                ...purchase,
                serviceDetails,
              };
            } catch (error) {
              console.error(`Error fetching service details for ID ${purchase.service_id}:`, error);
              return purchase;
            }
          })
        );

        setServices(servicesWithDetails);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [status]);

  const handleServiceClick = (service: ServiceWithDetails) => {
    setSelectedService(service);
  };

  if (loading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  if (services.length === 0) {
    return <div className="text-center py-4">No hay servicios en este estado</div>;
  }

  return (
    <>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={service.serviceDetails?.image || "https://via.placeholder.com/150"}
                  alt={service.serviceDetails?.service_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.serviceDetails?.service_name || "Servicio no encontrado"}
                    </h3>
                    <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mt-2">
                      {service.serviceDetails?.category || "Sin categoría"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${service.price}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(service.purchase_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {service.serviceDetails?.description || "Sin descripción"}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Estado: <span className="capitalize">{service.status}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <ServiceDetailsDialog
          service={{
            id: selectedService.id.toString(),
            name: selectedService.serviceDetails?.service_name || "Servicio no encontrado",
            category: selectedService.serviceDetails?.category || "Sin categoría",
            client: {
              name: "Cliente #" + selectedService.customer_id,
              avatar: "https://via.placeholder.com/150",
            },
            date: new Date(selectedService.purchase_date).toLocaleDateString(),
            time: new Date(selectedService.purchase_date).toLocaleTimeString(),
            status: selectedService.status as "pending" | "ongoing" | "completed" | "canceled",
            payment: "paid",
            earnings: parseFloat(selectedService.price),
            customer_id: selectedService.customer_id,
          }}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
};

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
        {["pending", "ongoing", "completed", "canceled"].map((tab) => (
          <button
            key={tab}
            className={`p-3 text-center rounded-md transition-all ${
              activeTab === tab 
                ? `${getStatusColor(tab)} font-semibold` 
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="mt-6 animate-fade-up">
        <ServiceList status={activeTab} />
      </div>
    </div>
  );
};

export default ServiceTabs;
