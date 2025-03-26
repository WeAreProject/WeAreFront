import { Service } from '../types/service';
import { Eye, MoreVertical, Pencil, Trash, Trash2, Power, PowerOff, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ServiceCardProps {
  service: Service;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const MyServiceCard = ({ service, onDelete, onToggleStatus }: ServiceCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (service.thumbnail === null) {
      setImageUrl(undefined);
      return;
    }

    if (typeof service.thumbnail === 'string') {
      setImageUrl(service.thumbnail);
      return;
    }

    const url = URL.createObjectURL(service.thumbnail);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [service.thumbnail]);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(service.id);
      toast.success("Service deleted successfully");
    }, 300);
  };

  return (
    <div className={`relative bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${isDeleting ? "scale-95 opacity-0" : ""}`}>
      <div className="relative h-48">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Image className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              service.status === "active" 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700"
            }`}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{service.category}</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10 border border-gray-100">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="aspect-square h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">${service.price}</p>
            <p className="text-sm text-gray-500">per session</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {service.bookings} bookings
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServiceCard;
