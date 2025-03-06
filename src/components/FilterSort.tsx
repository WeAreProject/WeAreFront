import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FilterSort = () => {
  const [selectedValue, setSelectedValue] = useState("popular");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[180px]">
        <button
          className="w-full flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-2 border border-gray-300 rounded-md"
          onClick={() => setIsOpen(!isOpen)} // Alternar el estado al hacer clic
        >
          <span>
            {selectedValue === "popular" && "Most Popular"}
            {selectedValue === "newest" && "Newest"}
            {selectedValue === "nearby" && "Nearby"}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Contenido del menú (se muestra solo si isOpen es true) */}
        {isOpen && (
    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setSelectedValue("popular");
          setIsOpen(false);
        }}
      >
        Most Popular
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setSelectedValue("newest");
          setIsOpen(false);
        }}
      >
        Newest
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setSelectedValue("nearby");
          setIsOpen(false);
        }}
      >
        Nearby
      </button>
    </div>
  )}
</div>
    </div>
  );
};
