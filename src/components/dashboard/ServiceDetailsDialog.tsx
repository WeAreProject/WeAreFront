import { QrCode, Star, Upload } from "lucide-react";

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
}

interface ServiceDetailsDialogProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceDetailsDialog = ({ service, onClose }: ServiceDetailsDialogProps) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Service Details</h2>
        <div className="grid gap-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
              <img
                src={service.client.avatar}
                alt={service.client.name}
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
            <h4 className="text-sm font-medium mb-2">Client Information</h4>
            <p className="text-sm"><span className="font-medium">Name:</span> {service.client.name}</p>
            <p className="text-sm"><span className="font-medium">Scheduled:</span> {service.date} at {service.time}</p>
          </div>

          {service.status === "completed" && (
            <div>
              <h4 className="text-sm font-medium mb-2">Rating & Review</h4>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(5.0)</span>
              </div>
              <p className="text-sm mt-2">"Excellent service! Very professional and timely delivery."</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button className="w-full mr-2 p-2 border rounded bg-gray-100 flex items-center justify-center">
              <Upload className="mr-2 h-4 w-4" /> Upload Files
            </button>
            <button className="w-full ml-2 p-2 border rounded bg-gray-100 flex items-center justify-center">
              <QrCode className="mr-2 h-4 w-4" /> Show QR Code
            </button>
          </div>

          {service.status === "pending" && (
            <button className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-600">
              Cancel Service
            </button>
          )}

          <button onClick={onClose} className="w-full mt-4 p-2 border rounded bg-gray-200 hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsDialog;