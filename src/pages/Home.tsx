import { Heart, Home, Star, Car, Grid } from "lucide-react";
import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { SearchBar } from "../components/SearchBar";
import { getServices, getBusinessById } from "../actions/services";
import { useNavigate } from "react-router-dom";

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

const categories = [
  { icon: Heart, name: "Healthcare", services: "245 services" },
  { icon: Home, name: "Home Repairs", services: "189 services" },
  { icon: Star, name: "Beauty", services: "356 services" },
  { icon: Car, name: "Automotive", services: "128 services" },
  { icon: Heart, name: "Maintenance", services: "167 services" },
  { icon: Grid, name: "Others", services: "243 services" },
];

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithBusiness | null>(null);
  const [services, setServices] = useState<ServiceWithBusiness[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceWithBusiness[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        
        const servicesWithBusiness = await Promise.all(
          servicesData.map(async (service) => {
            const business = await getBusinessById(service.business_id);
            return {
              ...service,
              provider: {
                name: business.business_name,
                image: business.image,
                rating: 4.8,
                reviews: 150,
              },
            };
          })
        );

        setServices(servicesWithBusiness);
        setFilteredServices(servicesWithBusiness);
      } catch (err) {
        setError("Error al cargar los servicios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(service => 
      service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const handleOpenModal = (service: ServiceWithBusiness) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando servicios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-12 pt-16">
      <Header />
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Find Your Perfect Service</h1>
        <p className="text-muted-foreground text-lg">
          Connect with trusted professionals for all your service needs
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            placeholder="Buscar servicios..."
            onSearch={setSearchQuery}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gray-100"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
                  <category.icon className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <h3 className="font-medium text-center">{category.name}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {category.services}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/business/${service.business_id}`);
                  }}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    <img
                      src={service.provider.image}
                      alt={service.provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold hover:text-purple-600">{service.provider.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                      <span>
                        {service.provider.rating} ({service.provider.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{service.service_name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm font-medium">
                  <span>${service.price}</span>
                </div>

                <button 
                  className="w-full py-2 text-center bg-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition"
                  onClick={() => handleOpenModal(service)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
};

export default HomePage;
