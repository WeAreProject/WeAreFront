import { useState, useEffect } from "react";
import { getPurchasesByBusinessId, getServiceById, getBusinessByOwnerId } from "../../actions/services";
import { Clock, Calendar } from "lucide-react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
import { Service } from "../../types/service";

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
  serviceDetails: Service;
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
              const transformedService: Service = {
                id: serviceDetails.id.toString(),
                name: serviceDetails.service_name,
                description: serviceDetails.description,
                price: parseFloat(serviceDetails.price),
                category: serviceDetails.category,
                thumbnail: serviceDetails.image,
                status: "active",
                bookings: 0,
                business_id: serviceDetails.business_id,
                service_name: serviceDetails.service_name,
                image: serviceDetails.image,
                created_at: serviceDetails.created_at,
                updated_at: serviceDetails.updated_at,
              };
              return {
                ...purchase,
                serviceDetails: transformedService,
              };
            } catch (error) {
              console.error(`Error fetching service details for ID ${purchase.service_id}:`, error);
              return null;
            }
          })
        );

        setServices(servicesWithDetails.filter((service): service is ServiceWithDetails => service !== null));
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
                  src={service.serviceDetails.image || "https://via.placeholder.com/150"}
                  alt={service.serviceDetails.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.serviceDetails.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mt-2">
                      {service.serviceDetails.category}
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
                  {service.serviceDetails.description}
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
          service={selectedService.serviceDetails}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
};

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const tabs = [
    { id: "pending", label: "Pendientes" },
    { id: "ongoing", label: "En Progreso" },
    { id: "completed", label: "Completados" },
    { id: "canceled", label: "Cancelados" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ServiceList status={activeTab} />
    </div>
  );
};

export default ServiceTabs;
