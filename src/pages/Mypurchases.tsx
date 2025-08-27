import { useState, useEffect } from "react";
import { Gift, Trash2, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import { getCustomerPurchases, type Purchase } from "../actions/purchases";
import BottomNav from "../components/BottomNav";

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  completed: "Completado",
  canceled: "Cancelado",
  thanked: "Gracias por su compra",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-400",
  completed: "bg-green-500",
  canceled: "bg-red-500",
  thanked: "bg-blue-500",
};

const LOCAL_STORAGE_KEY = "user_purchases";

const Mypurchases = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
          setError("No se encontró la información del usuario");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(userDataString);
        const customerId = userData.id;

        if (!customerId) {
          setError("No se encontró el ID del cliente en la información del usuario");
          setLoading(false);
          return;
        }

        const savedPurchases = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedPurchases) {
          const purchasesFromStorage = JSON.parse(savedPurchases).map((p: Purchase) => ({
            ...p,
            service: {
              ...p.service,
              image: p.service?.image || "/default-service.jpg",
            },
          }));
          setPurchases(purchasesFromStorage);
          setLoading(false);
          return;
        }

        const purchasesData = await getCustomerPurchases(customerId);
        const purchasesWithImages = purchasesData.map((p: Purchase) => ({
          ...p,
          service: {
            ...p.service,
            image: p.service?.image || "/default-service.jpg",
          },
        }));

        setPurchases(purchasesWithImages);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(purchasesWithImages));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleDeletePurchase = (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta compra?");
    if (!confirmDelete) return;

    const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
    setPurchases(updatedPurchases);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPurchases));
  };

  const handleCompletePurchase = (id: number) => {
    const updatedPurchases = purchases.map(purchase => {
      if (purchase.id === id) {
        return { ...purchase, status: "thanked" };
      }
      return purchase;
    });
    setPurchases(updatedPurchases);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPurchases));
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const serviceName = purchase.service?.service_name.toLowerCase() || "";
    const matchesSearch =
      serviceName.includes(search.toLowerCase()) ||
      purchase.service_id.toString().includes(search);
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const uniquePurchases = filteredPurchases.filter(
    (purchase, index, self) =>
      index === self.findIndex((p) => p.id === purchase.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pb-24 pt-20">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
              🛒 <span>Mis Compras</span>
            </h1>
            <p className="text-sm text-white/60">Ver y gestionar tu historial de compras</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar compras..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label htmlFor="statusFilter" className="sr-only">Filtrar por estado</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="completed">Completado</option>
                <option value="canceled">Cancelado</option>
                <option value="thanked">Gracias por su compra</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-white/50">Cargando compras...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : uniquePurchases.length === 0 ? (
            <div className="flex justify-center py-8">
              <p className="text-white/40">No se encontraron compras</p>
            </div>
          ) : (
            <div className="space-y-4">
              {uniquePurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl hover:scale-[1.01] transition-all duration-200"
                >
                  {purchase.service?.image && (
                    <img
                      src={purchase.service.image}
                      alt={purchase.service.service_name}
                      className="w-full h-40 object-cover rounded-xl border border-white/10 mb-3"
                      loading="lazy"
                    />
                  )}

                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-white">
                      {purchase.service?.service_name || "Servicio desconocido"}
                    </h3>
                    <p className="text-sm text-white/60">
                      {purchase.business?.business_name || "Negocio no encontrado"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusColors[purchase.status]}`}></span>
                      <span>{statusLabels[purchase.status]}</span>
                    </div>
                    <span>{new Date(purchase.purchase_date).toLocaleDateString()}</span>
                    <span className="text-white font-semibold">
                      ${parseFloat(purchase.price).toFixed(2)}
                    </span>
                  </div>

               <div className="flex flex-col gap-2">
  <div className="flex gap-2">
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition text-sm font-semibold shadow">
      <Gift className="w-4 h-4" />
      ¡Cashback obtenido!
    </button>
                      <button
                        onClick={() => handleDeletePurchase(purchase.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition text-sm font-semibold shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                    
                    {purchase.status === "pending" && (
                      <button
                        onClick={() => handleCompletePurchase(purchase.id)}
                     className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-xl transition text-sm font-semibold shadow mt-2"
>
  <CheckCircle className="w-4 h-4" />
  Terminar compra
</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Mypurchases;
