import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "../components/SearchBar";
import { ViewToggle } from "../components/ViewToggle";
import { FilterSort } from "../components/FilterSort";
import { CategoryCard } from "../components/CategoryCard";
import Header from "../components/Header";
import { getCategories } from "../actions/categories";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
}

const Categories = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setFilteredCategories(data);
      } catch (err) {
        setError("Error al cargar las categorías");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category => 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const featuredCategories = filteredCategories.filter((cat) => cat.featured);
  const regularCategories = filteredCategories.filter((cat) => !cat.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Cargando categorías...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

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
          <SearchBar 
            placeholder="Buscar categorías..."
            onSearch={setSearchQuery}
          />
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