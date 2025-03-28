import { useEffect, useState } from "react";
import { DollarSign, Users, CheckCircle, Star } from "lucide-react";
import { getPurchasesByBusinessId, getBusinessByOwnerId } from "../../actions/services";
import { getReviewsByBusinessId, calculateAverageRating } from "../../actions/reviews";

interface Stats {
  totalEarnings: number;
  activeClients: number;
  completedServices: number;
  averageRating: number;
}

const ServiceStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalEarnings: 0,
    activeClients: 0,
    completedServices: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (!userData.id) return;

        const businesses = await getBusinessByOwnerId(userData.id);
        if (!businesses || businesses.length === 0) return;

        const businessId = businesses[0].id;
        const purchases = await getPurchasesByBusinessId(businessId);
        const reviews = await getReviewsByBusinessId(businessId);
        
        const totalEarnings = purchases.reduce((acc, purchase) => acc + parseFloat(purchase.price), 0);
        const uniqueClients = new Set(purchases.map(p => p.customer_id)).size;
        const completedServices = purchases.filter(p => p.status === "completed").length;
        const averageRating = calculateAverageRating(reviews);
        
        setStats({
          totalEarnings,
          activeClients: uniqueClients,
          completedServices,
          averageRating,
        });
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-up">
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Total Earnings</h2>
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Total earnings from all services</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Active Clients</h2>
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.activeClients}</div>
          <p className="text-xs text-gray-500">Unique clients this month</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Completed Services</h2>
          <CheckCircle className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.completedServices}</div>
          <p className="text-xs text-gray-500">Total completed services</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Average Rating</h2>
          <Star className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.averageRating}</div>
          <p className="text-xs text-gray-500">Based on client feedback</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceStats;
