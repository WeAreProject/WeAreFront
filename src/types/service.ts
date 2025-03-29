export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    thumbnail: string | File | null;
    status: string;
    bookings: number;
    customer_id?: number;
    business_id?: number;
    service_name?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
    provider?: {
        name: string;
        image: string;
        rating: number;
        reviews: number;
    };
}
  
export interface ServiceFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  thumbnail: File | null;
}

export interface ServiceWithBusiness extends Service {
  provider: {
    name: string;
    image: string;
    rating: number;
    reviews: number;
  };
  business_id: number;
  service_name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceListItem extends Service {
    client: {
        name: string;
        avatar: string;
    };
    date: string;
    time: string;
    payment: "paid" | "pending" | "refunded";
    earnings?: number;
}
  