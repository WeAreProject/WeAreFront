import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Book, Briefcase, DollarSign, ChevronRight, } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { SearchBar } from "../components/SearchBar";
// URLs de imágenes para los servicios
const serviceIcons = {
    "Médico general": "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
    "Cirujano": "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
    "Enfermero": "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
    "Psicólogo": "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    "Veterinario": "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    "Nutriólogo": "https://cdn-icons-png.flaticon.com/512/706/706195.png",
    "Dentista": "https://cdn-icons-png.flaticon.com/512/2922/2922723.png",
    "Ginecólogo": "https://cdn-icons-png.flaticon.com/512/4003/4003830.png",
    "Vendedor": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    "Representante comercial": "https://cdn-icons-png.flaticon.com/512/4472/4472585.png",
    "Gerente de ventas": "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    "Asesor comercial": "https://cdn-icons-png.flaticon.com/512/4781/4781517.png",
    "Agrónomo": "https://cdn-icons-png.flaticon.com/512/1998/1998605.png",
    "Veterinario zootecnista": "https://cdn-icons-png.flaticon.com/512/616/616430.png",
    "Forestal": "https://cdn-icons-png.flaticon.com/512/427/427735.png",
    "Ambientalista": "https://cdn-icons-png.flaticon.com/512/1039/1039770.png",
    "Jardinero": "https://cdn-icons-png.flaticon.com/512/1899/1899691.png",
    "Granja": "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    "Vivero": "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    "Reserva natural": "https://cdn-icons-png.flaticon.com/512/1532/1532688.png",
    "Músico": "https://cdn-icons-png.flaticon.com/512/3004/3004613.png",
    "Actor": "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    "Escritor": "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
    "Bailarín": "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "Pintor": "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
    "Fotógrafo": "https://cdn-icons-png.flaticon.com/512/2920/2920039.png",
    "Director de arte": "https://cdn-icons-png.flaticon.com/512/3480/3480555.png",
    "Galería de arte": "https://cdn-icons-png.flaticon.com/512/3471/3471340.png",
    "Centro cultural": "https://cdn-icons-png.flaticon.com/512/2784/2784459.png",
    "Agente telefónico": "https://cdn-icons-png.flaticon.com/512/3075/3075978.png",
    "Soporte técnico": "https://cdn-icons-png.flaticon.com/512/3209/3209266.png",
    "Ejecutivo de atención": "https://cdn-icons-png.flaticon.com/512/1256/1256657.png",
    "Gestor de quejas": "https://cdn-icons-png.flaticon.com/512/3135/3135712.png",
    "Centro de llamadas": "https://cdn-icons-png.flaticon.com/512/2830/2830307.png",
};
// ✅ Lista de categorías
const categories = [
    {
        icon: Heart,
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
        color: "text-red-600",
        gradient: "from-red-500 to-red-400",
        serviceIcon: "https://cdn-icons-png.flaticon.com/512/2965/2965578.png",
    },
    {
        icon: DollarSign,
        name: "Ventas y Comercio",
        services: [
            "Vendedor",
            "Representante comercial",
            "Gerente de ventas",
            "Asesor comercial",
        ],
        color: "text-green-600",
        gradient: "from-green-500 to-lime-400",
        serviceIcon: "https://cdn-icons-png.flaticon.com/512/2965/2965578.png",
    },
    {
        icon: Book,
        name: "Agricultura y Medio Ambiente",
        services: [
            "Agrónomo",
            "Veterinario zootecnista",
            "Forestal",
            "Ambientalista",
            "Jardinero",
            "Granja",
            "Vivero",
            "Reserva natural",
        ],
        color: "text-teal-600",
        gradient: "from-emerald-500 to-green-400",
        serviceIcon: "https://cdn-icons-png.flaticon.com/512/2965/2965578.png",
    },
    {
        icon: Briefcase,
        name: "Arte y Entretenimiento",
        services: [
            "Músico",
            "Actor",
            "Escritor",
            "Bailarín",
            "Pintor",
            "Fotógrafo",
            "Director de arte",
            "Galería de arte",
            "Centro cultural",
        ],
        color: "text-red-600",
        gradient: "from-red-500 to-red-400",
        serviceIcon: "https://cdn-icons-png.flaticon.com/512/2965/2965578.png",
    },
    {
        icon: Star,
        name: "Atención al Cliente",
        services: [
            "Agente telefónico",
            "Soporte técnico",
            "Ejecutivo de atención",
            "Gestor de quejas",
            "Centro de llamadas",
        ],
        color: "text-yellow-600",
        gradient: "from-yellow-400 to-orange-500",
        serviceIcon: "https://cdn-icons-png.flaticon.com/512/2965/2965578.png",
    },
];
// ✅ Personas (simulación)
const mockPeople = {
    "Médico general": [
        {
            name: "Dr. Juan Pérez",
            title: "Médico General",
            bio: "Experto en atención primaria y diagnóstico clínico.",
            photoUrl: "src/images/profiles/N1.png",
        },
        {
            name: "Dra. Ana Gómez",
            title: "Medicina Familiar",
            bio: "Especialista en medicina preventiva y salud familiar.",
            photoUrl: "src/images/profiles/N2.png",
        },
    ],
    "Psicólogo": [
        {
            name: "Lic. Carla Ríos",
            title: "Psicóloga Clínica",
            bio: "Enfoque cognitivo conductual para adultos y adolescentes.",
            photoUrl: "src/images/profiles/P1.png",
        },
    ],
    "Vendedor": [
        {
            name: "Luis Torres",
            title: "Vendedor de Electrónica",
            bio: "Apasionado por la tecnología y atención al cliente.",
            photoUrl: "src/images/profiles/V1.png",
        },
    ],
};
const Categories = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    useEffect(() => {
        const filtered = categories.filter((category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredCategories(filtered);
    }, [searchQuery]);
    const handleBack = () => {
        if (selectedService) {
            setSelectedService(null);
        }
        else {
            setSelectedCategory(null);
            setSearchQuery("");
        }
    };
    const getCurrentTitle = () => {
        if (selectedService)
            return selectedService;
        if (selectedCategory)
            return selectedCategory.name;
        return "Categorías";
    };
    const renderServicePeople = () => (_jsx("div", { className: "space-y-4 animate-fade-in", children: mockPeople[selectedService] && mockPeople[selectedService].length > 0 ? (mockPeople[selectedService].map((person, index) => (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer", onClick: () => navigate("/fakeprofile", { state: { person } }), children: [_jsx("img", { src: person.photoUrl, alt: `Foto de ${person.name}`, className: "w-16 h-16 rounded-full object-cover border border-gray-200" }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: person.name }), _jsx("p", { className: "text-sm text-gray-600", children: person.title }), _jsx("p", { className: "text-xs text-gray-500 mt-1 line-clamp-2", children: person.bio })] }), _jsx("span", { className: "text-xs text-red-600", children: "Ver perfil \u2192" })] }, index)))) : (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-gray-500", children: "No hay profesionales registrados" }), _jsx("button", { onClick: handleBack, className: "mt-4 text-red-600 hover:underline", children: "Volver atr\u00E1s" })] })) }));
    // ✅ Lista de servicios con imágenes
    const renderCategoryServices = () => (_jsxs("div", { className: "animate-fade-in", children: [_jsxs("h2", { className: "text-lg font-semibold mb-4 text-gray-800 text-center", children: ["Selecciona un servicio (", selectedCategory?.services.length, ")"] }), _jsx("ul", { className: "space-y-4", children: selectedCategory?.services.map((service) => (_jsxs("li", { onClick: () => setSelectedService(service), className: "flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-200 hover:from-red-50 hover:to-red-100 hover:border-red-400 hover:scale-[1.02] transition-all cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${selectedCategory?.gradient} shadow-md hover:scale-110 transition-transform overflow-hidden`, children: _jsx("img", { src: serviceIcons[service] || selectedCategory?.serviceIcon, alt: service, className: "w-6 h-6 object-contain" }) }), _jsx("span", { className: "font-medium text-gray-700", children: service })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full", children: [mockPeople[service]?.length || 0, " profesionales"] }), _jsx(ChevronRight, { className: "w-5 h-5 text-gray-400" })] })] }, service))) })] }));
    // ✅ Categorías con borde RGB animado y círculos
    const renderCategoryList = () => (_jsxs(_Fragment, { children: [_jsx("style", { children: `
          @keyframes borderRGB {
            0% { border-color: rgb(255, 0, 0); }
            25% { border-color: rgb(0, 255, 0); }
            50% { border-color: rgb(0, 0, 255); }
            75% { border-color: rgb(255, 255, 0); }
            100% { border-color: rgb(255, 0, 0); }
          }
        ` }), _jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx("div", { className: "flex-1", children: _jsx(SearchBar, { placeholder: "Buscar categor\u00EDas...", onSearch: setSearchQuery, value: searchQuery }) }), _jsx("button", { className: "px-3 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors", children: "M\u00E1s populares" })] }), _jsx("div", { className: "grid grid-cols-2 gap-6", children: filteredCategories.map((category) => (_jsxs("div", { onClick: () => setSelectedCategory(category), className: "cursor-pointer flex flex-col items-center text-center p-5 rounded-2xl bg-white shadow-sm hover:scale-105 hover:shadow-xl transition-all", style: {
                        borderWidth: "3px",
                        borderStyle: "solid",
                        animation: "borderRGB 6s infinite linear",
                    }, children: [_jsx("div", { className: `w-20 h-20 rounded-full flex items-center justify-center mb-4 text-white bg-gradient-to-r ${category.gradient} shadow-md`, children: _jsx(category.icon, { className: "w-10 h-10" }) }), _jsx("p", { className: "font-bold text-base text-gray-900 line-clamp-2", children: category.name }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [category.services.length, " servicios"] })] }, category.name))) })] }));
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pt-20 pb-28 px-4 max-w-md mx-auto relative", children: [_jsx(Header, {}), _jsx("div", { className: "w-full mb-6 flex justify-center", children: _jsx("img", { src: "/images/category-icons/he.png", alt: "Banner de categor\u00EDas", className: "w-full max-w-[1000px] h-auto rounded-xl object-contain" }) }), _jsx("h1", { className: "text-2xl font-bold text-center mb-6 text-gray-900", children: getCurrentTitle() }), (selectedCategory || selectedService) && (_jsxs("button", { onClick: handleBack, className: "flex items-center mb-4 text-red-600 hover:text-red-800 transition-colors text-sm", children: [_jsx("span", { className: "mr-1", children: "\u2190" }), " Volver atr\u00E1s"] })), _jsx("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: selectedService
                    ? renderServicePeople()
                    : selectedCategory
                        ? renderCategoryServices()
                        : renderCategoryList() }), _jsx(BottomNav, {})] }));
};
export default Categories;
