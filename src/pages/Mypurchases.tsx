import { useState, useEffect } from "react";
import { PurchaseCard } from "../components/PurchaseCard";
import { SearchFilters } from "../components/SearchFilters";
import Header from "../components/Header";
import { getCustomerPurchases, type Purchase } from "../actions/purchases";

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

        const purchasesData = await getCustomerPurchases(customerId);
        setPurchases(purchasesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.service?.service_name.toLowerCase().includes(search.toLowerCase()) ||
      purchase.service_id.toString().includes(search);

    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-6">
      <Header />
      <div className="max-w-md mx-auto mt-6 space-y-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            🛒 Mis compras
          </h1>
          <p className="text-gray-500 text-sm">Ver y gestionar tu historial de compras.</p>
        </div>

        <SearchFilters
          searchValue={search}
          statusValue={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <p className="text-center text-gray-500">Cargando compras...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredPurchases.length === 0 ? (
          <p className="text-center text-gray-400">No se encontraron compras</p>
        ) : (
          filteredPurchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={{
                id: purchase.id.toString(),
                image: purchase.service?.image || "",
                serviceName: purchase.service?.service_name || "",
                professionalName: purchase.business?.business_name || "Negocio no encontrado",
                date: new Date(purchase.purchase_date).toLocaleDateString(),
                price: parseFloat(purchase.price),
                status: purchase.status as "completed" | "pending" | "canceled",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Mypurchases;
