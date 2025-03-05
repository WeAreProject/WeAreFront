import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "../components/SearchBar";
import { ViewToggle } from "../components/ViewToggle";
import { FilterSort } from "../components/FilterSort";
import { CategoryCard } from "../components/CategoryCard";
import Header from "../components/Header";
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: "1",
    title: "Home Services",
    description: "Professional home maintenance and improvement services",
    icon: "home",
    featured: true,
  },
  {
    id: "2",
    title: "Beauty & Wellness",
    description: "Personal care and wellness services",
    icon: "heart",
    featured: true,
  },
  {
    id: "3",
    title: "Business & Tech",
    description: "Professional business and technology solutions",
    icon: "briefcase",
    featured: true,
  },
  {
    id: "4",
    title: "Repairs",
    description: "Expert repair services for various items",
    icon: "tools",
    featured: false,
  },
  {
    id: "5",
    title: "Events",
    description: "Professional event planning and management",
    icon: "calendar",
    featured: false,
  },
];

const Categories = () => {
  const [isGrid, setIsGrid] = useState(true);
  const featuredCategories = categories.filter((cat) => cat.featured);
  const regularCategories = categories.filter((cat) => !cat.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 space-y-12 pt-16 to-gray-100">
        <Header/>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Explore Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover professional services tailored to your needs
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SearchBar />
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <ViewToggle isGrid={isGrid} onToggle={() => setIsGrid(!isGrid)} />
          <FilterSort />
        </div>

        {featuredCategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Featured Categories</h2>
            <div className={`grid ${
              isGrid ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            } gap-6`}>
              {featuredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CategoryCard {...category} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-6">All Categories</h2>
          <div className={`grid ${
            isGrid ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          } gap-6`}>
            {regularCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;