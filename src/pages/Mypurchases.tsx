import { useState } from "react";
import { PurchaseCard } from "../components/PurchaseCard";
import { SearchFilters } from "../components/SearchFilters";
import Header from "../components/Header";
// Mock data - in a real app, this would come from an API
const mockPurchases = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    serviceName: "Website Development",
    professionalName: "John Developer",
    date: "March 15, 2024",
    price: 299.99,
    status: "completed" as const,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    serviceName: "Logo Design",
    professionalName: "Sarah Designer",
    date: "March 10, 2024",
    price: 149.99,
    status: "pending" as const,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    serviceName: "SEO Optimization",
    professionalName: "Mike Analytics",
    date: "March 5, 2024",
    price: 199.99,
    status: "canceled" as const,
  },
];

const Mypurchases = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPurchases = mockPurchases.filter((purchase) => {
    const matchesSearch =
      purchase.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      purchase.professionalName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="container mx-auto max-w-6xl px-2 py-8 space-y-6 mt-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
          <p className="text-gray-600">View and manage your purchase history</p>
        </div>

        <SearchFilters
          searchValue={search}
          statusValue={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        <div className="space-y-4">
          {filteredPurchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
          
          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No purchases found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypurchases;