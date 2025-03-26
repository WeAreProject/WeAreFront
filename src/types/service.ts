export interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    status: "active" | "disabled";
    thumbnail: string | File | null;
    bookings: number;
    earnings: number;
    ratings: number;
  }
  
export interface ServiceFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  thumbnail: File | null;
}
  