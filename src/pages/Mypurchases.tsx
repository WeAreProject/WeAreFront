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
        console.log('Datos del usuario:', userData);
        const customerId = userData.id;
        
        if (!customerId) {
          setError("No se encontró el ID del cliente en la información del usuario");
          setLoading(false);
          return;
        }

        const purchasesData = await getCustomerPurchases(customerId);
        console.log('Datos de compras recibidos:', purchasesData);
        setPurchases(purchasesData);
      } catch (err) {
        console.error('Error completo:', err);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto max-w-6xl px-2 py-8 space-y-6 mt-16">
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando compras...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto max-w-6xl px-2 py-8 space-y-6 mt-16">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <p className="text-gray-500 mt-2">Por favor, intenta recargar la página</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="container mx-auto max-w-6xl px-2 py-8 space-y-6 mt-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Mis Compras</h1>
          <p className="text-gray-600">Ver y gestionar tu historial de compras</p>
        </div>

        <SearchFilters
          searchValue={search}
          statusValue={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        <div className="space-y-4">
          {filteredPurchases.map((purchase) => {
            console.log('Renderizando compra:', purchase);
            return (
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
            );
          })}
          
          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron compras</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypurchases;