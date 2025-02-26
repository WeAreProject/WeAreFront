import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          placeholder="Search for a category..."
          className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" size={20} />
      </div>
    </div>
  );
};