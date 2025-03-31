interface Service {
  id: number;
  service_name: string;
  image: string;
  price: string;
}

interface Business {
  id: number;
  business_name: string;
  category: string;
  image: string;
  owner_id?: number;
  description?: string;
  email?: string;
  phone?: string;
}

interface Purchase {
  id: number;
  customer_id: number;
  service_id: number;
  business_id: number;
  status: string;
  purchase_date: string;
  price: string;
  service?: Service;
  business?: Business;
}

const BASE_URL = 'https://rest-api-weare-production.up.railway.app/api';

export const getBusinessDetails = async (businessId: number): Promise<Business> => {
  try {
    console.log('Obteniendo detalles del negocio:', businessId);
    const response = await fetch(`${BASE_URL}/businesses/${businessId}`);

    if (!response.ok) {
      console.error('Error en la respuesta del negocio:', response.status);
      throw new Error("Error al obtener detalles del negocio");
    }

    const data = await response.json();
    console.log('Datos del negocio obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener detalles del negocio:', error);
    throw error instanceof Error ? error : new Error("Error desconocido al obtener detalles del negocio");
  }
};

export const getCustomerPurchases = async (customerId: number): Promise<Purchase[]> => {
  try {
    console.log('Obteniendo compras para el cliente:', customerId);
    const response = await fetch(`${BASE_URL}/purchases/customer/${customerId}`);

    if (!response.ok) {
      console.error('Error en la respuesta de compras:', response.status);
      throw new Error("Error al obtener las compras");
    }

    const purchasesData: Purchase[] = await response.json();
    console.log('Compras obtenidas:', purchasesData);

    // Obtener detalles de cada servicio y negocio
    const purchasesWithDetails = await Promise.all(
      purchasesData.map(async (purchase) => {
        console.log('Procesando compra:', purchase.id, 'business_id:', purchase.business_id);
        const [serviceData, businessData] = await Promise.all([
          getServiceDetails(purchase.service_id),
          getBusinessDetails(purchase.business_id)
        ]);
        
        return {
          ...purchase,
          service: serviceData,
          business: businessData,
        };
      })
    );

    console.log('Compras con detalles:', purchasesWithDetails);
    return purchasesWithDetails;
  } catch (error) {
    console.error('Error en getCustomerPurchases:', error);
    throw error instanceof Error ? error : new Error("Error desconocido al obtener las compras");
  }
};

export const getServiceDetails = async (serviceId: number): Promise<Service> => {
  try {
    console.log('Obteniendo detalles del servicio:', serviceId);
    const response = await fetch(`${BASE_URL}/services/${serviceId}`);

    if (!response.ok) {
      console.error('Error en la respuesta del servicio:', response.status);
      throw new Error("Error al obtener detalles del servicio");
    }

    const data = await response.json();
    console.log('Datos del servicio obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener detalles del servicio:', error);
    throw error instanceof Error ? error : new Error("Error desconocido al obtener detalles del servicio");
  }
};

export type { Purchase, Service, Business };

interface PurchaseData {
  customer_id: number;
  service_id: number;
  business_id: number;
  price: number;
}

export const createPurchase = async (purchaseData: PurchaseData) => {
  try {
    console.log('Creando compra con datos:', purchaseData);
    const response = await fetch(`${BASE_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error en la respuesta del servidor:', response.status, errorData);
      throw new Error(errorData?.message || 'Error al crear la compra');
    }

    const data = await response.json();
    console.log('Compra creada exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error en createPurchase:', error);
    throw error instanceof Error ? error : new Error('Error desconocido al crear la compra');
  }
}; 