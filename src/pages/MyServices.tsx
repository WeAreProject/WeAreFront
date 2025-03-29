import { useState, useEffect } from "react";
import MyServiceCard from '../components/MyServiceCard';
import CreateServiceModal from '../components/CreateServiceModal';
import { Service, ServiceFormData } from '../types/service';
import { Plus } from "lucide-react";
import Header from "../components/Header";
import { getBusinessByOwnerId, createService, getServicesByBusinessId } from '../actions/services';
import { useNavigate } from 'react-router-dom';

const MyServices = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBusinessAndServices = async () => {
      const userData = localStorage.getItem('user');
      console.log('User data from localStorage:', userData);
      
      if (!userData) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      console.log('Parsed user:', user);
      
      const businesses = await getBusinessByOwnerId(user.id);
      console.log('Business data:', businesses);
      
      if (businesses && businesses.length > 0) {
        const business = businesses[0]; // Tomamos el primer negocio
        setBusinessId(business.id);
        const servicesData = await getServicesByBusinessId(business.id);
        console.log('Services data:', servicesData);
        
        setServices(servicesData.map(service => ({
          id: service.id,
          name: service.service_name,
          category: service.category,
          description: service.description,
          price: service.price,
          status: "active",
          thumbnail: service.image,
          bookings: 0,
          earnings: 0,
          ratings: 0
        })));
      }
    };

    loadBusinessAndServices();
  }, [navigate]);

  const handleCreateService = async (formData: ServiceFormData) => {
    if (!businessId || !formData.thumbnail) return;

    console.log('Creating service with data:', {
      business_id: businessId,
      ...formData
    });

    const createdService = await createService({
      business_id: businessId,
      service_name: formData.name,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      image: formData.thumbnail
    });

    console.log('Created service response:', createdService);

    if (createdService) {
      setServices(prev => [...prev, {
        id: createdService.id,
        name: createdService.service_name,
        category: createdService.category,
        description: createdService.description,
        price: createdService.price,
        status: "active",
        thumbnail: createdService.image,
        bookings: 0,
        earnings: 0,
        ratings: 0
      }]);
      setShowCreateModal(false);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Services</h1>
            <button 
              onClick={() => setShowCreateModal(true)} 
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Service
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <MyServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteService}
            />
          ))}
        </div>

        <CreateServiceModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateService}
        />
      </main>
    </div>
  );
};

export default MyServices;
