import { useState } from "react";
import { MessageCircle, CheckCircle, XCircle } from "lucide-react";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
import { Service } from "../../types/service";

interface ServiceListItem extends Service {
  client: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  payment: "paid" | "pending" | "refunded";
  earnings?: number;
}

const mockServices: ServiceListItem[] = [
  {
    id: "1",
    name: "Website Design",
    description: "Professional website design service",
    price: 1500,
    category: "Design",
    thumbnail: "/placeholder.svg",
    status: "pending",
    bookings: 0,
    client: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg",
    },
    date: "2024-03-20",
    time: "14:30",
    payment: "pending",
  },
  {
    id: "2",
    name: "SEO Optimization",
    description: "Search engine optimization service",
    price: 1500,
    category: "Marketing",
    thumbnail: "/placeholder.svg",
    status: "ongoing",
    bookings: 1,
    client: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg",
    },
    date: "2024-03-21",
    time: "10:00",
    payment: "paid",
    earnings: 1500,
  },
];

const getStatusColor = (status: ServiceListItem["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "ongoing":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "canceled":
      return "bg-red-100 text-red-800";
  }
};

const getPaymentColor = (payment: ServiceListItem["payment"]) => {
  switch (payment) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "refunded":
      return "bg-red-100 text-red-800";
  }
};

interface ServiceListProps {
  status: ServiceListItem["status"];
}

const ServiceList = ({ status }: ServiceListProps) => {
  const [selectedService, setSelectedService] = useState<ServiceListItem | null>(null);
  const filteredServices = mockServices.filter(
    (service) => service.status === status
  );

  const handleOpenDialog = (service: ServiceListItem) => {
    setSelectedService(service);
  };

  return (
    <div className="space-y-4">
      {filteredServices.map((service) => (
        <div
          key={service.id}
          className="p-6 flex justify-between items-center rounded-lg shadow-md cursor-pointer backdrop-blur-sm bg-white/50 transition-all hover:shadow-lg"
          onClick={() => handleOpenDialog(service)}
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
              <img
                src={service.client.avatar}
                alt={service.client.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.category}</p>
              <div className="flex space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(service.status)}`}>
                  {service.status}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getPaymentColor(service.payment)}`}>
                  {service.payment}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {service.earnings && (
              <span className="text-lg font-semibold text-green-600">
                ${service.earnings}
              </span>
            )}
            <div className="flex space-x-2">
              <button className="p-2 rounded-full border hover:bg-gray-100">
                <MessageCircle className="h-4 w-4" />
              </button>
              {service.status === "pending" && (
                <button className="p-2 rounded-full border text-red-600 hover:bg-red-100">
                  <XCircle className="h-4 w-4" />
                </button>
              )}
              {service.status === "ongoing" && (
                <button className="p-2 rounded-full border text-green-600 hover:bg-green-100">
                  <CheckCircle className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <ServiceDetailsDialog
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default ServiceList;
