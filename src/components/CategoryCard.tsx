import { icons } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export const CategoryCard = ({ title, description, icon, featured }: CategoryCardProps) => {
  const LucideIcon = icons[icon as keyof typeof icons];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg ${
        featured ? "ring-2 ring-gray-200" : ""
      }`}
    >
      {featured && (
        <span className="absolute top-3 right-3 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
          Featured
        </span>
      )}
      <div className="w-12 h-12 mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
        {LucideIcon && <LucideIcon className="text-gray-600" size={24} />}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};