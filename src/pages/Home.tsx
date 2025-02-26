import { Search, Heart, Home, Star, Car, Grid} from "lucide-react";
import React, { useState } from "react";
import "../index.css";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { SearchBar } from "../components/SearchBar";
const featuredServices = [
  {
    id: 1,
    title: "Premium Cleaning Service",
    provider: {
      name: "CleanCo",
      image:
        "https://res.cloudinary.com/dxh55fgry/image/upload/v1739424339/samples/outdoor-woman.jpg", // Aquí va la URL de la imagen
      rating: 4.8,
      reviews: 150,
    },
    description: "High-quality cleaning service for homes and offices.",
    price: "$100",
    availability: "Available Now",
  },
  {
    id: 2,
    title: "Car Repair",
    provider: {
      name: "CleanCo",
      image:
        "https://res.cloudinary.com/dxh55fgry/image/upload/v1739424339/samples/outdoor-woman.jpg", // Aquí va la URL de la imagen
      rating: 4.8,
      reviews: 150,
    },
    description: "Professional repair for all types of cars.",
    price: "$200",
    availability: "Available Soon",
  },
  {
    id: 3,
    title: "Car Repair",
    provider: {
      name: "CleanCo",
      image:
        "https://res.cloudinary.com/dxh55fgry/image/upload/v1739424339/samples/outdoor-woman.jpg", // Aquí va la URL de la imagen
      rating: 4.8,
      reviews: 150,
    },
    description: "Professional repair for all types of cars.",
    price: "$200",
    availability: "Available Soon",
  },
  // Más servicios aquí
];

const categories = [
  { icon: Heart, name: "Healthcare", services: "245 services" },
  { icon: Home, name: "Home Repairs", services: "189 services" },
  { icon: Star, name: "Beauty", services: "356 services" },
  { icon: Car, name: "Automotive", services: "128 services" },
  { icon: Heart, name: "Maintenance", services: "167 services" },
  { icon: Grid, name: "Others", services: "243 services" },
];
const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-12 pt-16">
       <Header />
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Find Your Perfect Service</h1>
        <p className="text-muted-foreground text-lg">
          Connect with trusted professionals for all your service needs
        </p>
        <div className="max-w-2xl mx-auto">
    <SearchBar/>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gray-100"
            >
              <div className="flex justify-center items-center mb-4">
                {/* Círculo gris detrás del icono */}
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

      {/* Featured Services Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="service-card bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Imagen de encabezado */}
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                <img
                  src={service.provider.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                {/* Información del proveedor */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    <img
                      src={service.provider.image}
                      alt={service.provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{service.provider.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                      <span>
                        {service.provider?.rating} ({service.provider?.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descripción del servicio */}
                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>

                {/* Precio y disponibilidad */}
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{service.price}</span>
                  <span className="text-green-600">{service.availability}</span>
                </div>

                {/* Botón de detalles */}
                <button className="w-full py-2 text-center bg-purple-200 text-purple-700 font-semibold rounded-lg hover:bg-purple-300 transition"  onClick={() => setIsModalOpen(true)}>
                  View Details
                </button>
                      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
