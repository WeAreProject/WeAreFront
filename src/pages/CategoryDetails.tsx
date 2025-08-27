import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

interface CategoryData {
  [key: string]: {
    name: string;
    services: string[];
    servicesCount: string;
  };
}

const categoryData: CategoryData = {
  salud: {
    name: "Salud y Medicina",
    services: [
      "Médico general",
      "Cirujano",
      "Enfermero",
      "Psicólogo",
      "Veterinario",
      "Nutriólogo",
      "Dentista",
      "Ginecólogo",
    ],
    servicesCount: "15 servicios"
  },
  belleza: {
    name: "Belleza y Cuidado Personal",
    services: [
      "Estilista",
      "Maquillista",
      "Barbero",
      "Manicurista",
    ],
    servicesCount: "9 servicios"
  },
  educacion: {
    name: "Educación y Docencia",
    services: [
      "Maestro de primaria",
      "Profesor de universidad",
      "Tutor privado",
    ],
    servicesCount: "10 servicios"
  },
  // ... otras categorías
};

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  if (!id || !categoryData[id]) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-28 px-4 max-w-md mx-auto">
        <Header />
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Categoría no encontrada
        </h1>
        <BottomNav />
      </div>
    );
  }

  const { name, services, servicesCount } = categoryData[id];
  const state = location.state || {};

  return (
    <div className="min-h-screen bg-white pt-20 pb-28 px-4 max-w-md mx-auto">
      <Header />

      <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Servicios en {name}
      </h1>
      
      <p className="text-center text-gray-500 mb-4">{servicesCount}</p>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No hay servicios registrados.</p>
      ) : (
        <ul className="space-y-2">
          {services.map((servicio, i) => (
            <li
              key={i}
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg shadow-sm text-sm"
            >
              {servicio}
            </li>
          ))}
        </ul>
      )}

      <BottomNav />
    </div>
  );
};

export default CategoryDetail;