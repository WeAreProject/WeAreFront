import ServiceStats from "../components/dashboard/ServiceStats";
import ServiceTabs from "../components/dashboard/ServiceTabs";
import Header from "../components/Header";

const ServiceDashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header/>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Service Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your services and track performance
        </p>
      </div>

      <ServiceStats />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Services Overview</h2>
        <ServiceTabs />
      </div>
    </div>
  );
};

export default ServiceDashboard;