import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export interface Category {
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export const CategoryCard = ({ title, description, icon, featured }: Category) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categories/${title.toLowerCase()}`);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active handleClick
    navigate("/payment-methods", {
      state: { serviceName: title },
    });
  };

  const imagePath = `/imagenes/${icon}`;

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ y: -5 }}
      role="button"
      tabIndex={0}
      className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        featured ? "ring-2 ring-primary-500 bg-primary-50" : ""
      }`}
    >
      {featured && (
        <span className="absolute top-3 right-3 text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
          Destacado
        </span>
      )}
      <div className="w-12 h-12 mb-4 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={imagePath}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/imagenes/default-category.png";
          }}
        />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      <button
        onClick={handleBuyClick}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Comprar servicio
      </button>
    </motion.div>
  );
};
