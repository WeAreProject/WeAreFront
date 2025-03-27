import { DollarSign, Star, CheckCircle, Users } from "lucide-react";

const ServiceStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-up">
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Total Earnings</h2>
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-gray-500">+20.1% from last month</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Active Clients</h2>
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-gray-500">+180.1% from last month</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Completed Services</h2>
          <CheckCircle className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-gray-500">+19% from last month</p>
        </div>
      </div>
      <div className="p-4 rounded-lg backdrop-blur-sm bg-white/50 shadow-lg transition-all hover:scale-105">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Average Rating</h2>
          <Star className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">4.9</div>
          <p className="text-xs text-gray-500">+8% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceStats;
