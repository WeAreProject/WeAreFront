import { toast } from "sonner";
import { Business } from "../types/business";

const API_URL = "https://rest-api-weare-production.up.railway.app/api";

interface Service {
  id: number;
  business_id: number;
  service_name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ServiceData {
  id: string;
  service_name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

interface CreateServiceData {
  business_id: number;
  service_name: string;
  category: string;
  price: number;
  description: string;
  image: File;
}

interface Purchase {
  id: number;
  customer_id: number;
  service_id: number;
  business_id: number;
  status: string;
  purchase_date: string;
  price: string;
}

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/services`);

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getBusinessById = async (id: number): Promise<Business> => {
  try {
    const response = await fetch(`${API_URL}/businesses/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el negocio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching business:", error);
    throw error;
  }
};

export const getBusinessByOwnerId = async (ownerId: number): Promise<Business[]> => {
  try {
    const response = await fetch(`${API_URL}/businesses/owner/${ownerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch business');
    }
    return await response.json();
  } catch (error) {
    toast.error('Error fetching business information');
    return [];
  }
};

export const createService = async (data: CreateServiceData): Promise<ServiceData | null> => {
  try {
    const formData = new FormData();
    formData.append('business_id', data.business_id.toString());
    formData.append('service_name', data.service_name);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('image', data.image);

    const response = await fetch(`${API_URL}/services/register`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    return await response.json();
  } catch (error) {
    toast.error('Error creating service');
    return null;
  }
};

export const getServicesByBusinessId = async (businessId: number): Promise<ServiceData[]> => {
  try {
    const response = await fetch(`${API_URL}/services/business/${businessId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return await response.json();
  } catch (error) {
    toast.error('Error fetching services');
    return [];
  }
};

export const getPurchasesByBusinessId = async (businessId: number): Promise<Purchase[]> => {
  try {
    const response = await fetch(`${API_URL}/purchases/business/${businessId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    return await response.json();
  } catch (error) {
    toast.error('Error fetching purchases');
    return [];
  }
};

export const getServiceById = async (serviceId: number): Promise<Service> => {
  try {
    const response = await fetch(`${API_URL}/services/${serviceId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service details');
    }
    return await response.json();
  } catch (error) {
    toast.error('Error fetching service details');
    throw error;
  }
}; 