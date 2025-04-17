import { API_URL } from '../config';

interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  image?: string;
}

export const fetchCustomer = async (id: number): Promise<Customer | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/customers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};