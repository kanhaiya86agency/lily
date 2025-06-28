import {ReactNode} from 'react';

export type Product = {
  images: string[];
  serviceAreaKM: string[];
  isVerified: any;
  location: number;
  availableDays: any;
  workingHours: any;
  title: ReactNode;
  id: string;
  price: number;
  imageUrl: string[] | undefined;
  name: string;
  type: string;
  profile_image_url: string;
  description: string;
  hourly_rate: number;
  experience_years: number;
  languages_spoken: string[];
  skills: string[];
  certifications: string[];
  available_days: string[];
  availability_hours: string;
  verified: boolean;
  service_area_km: number;
  rating: number;
  category: string;
  createdAt: string | undefined;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
  user: {
    firstName: string;
    lastName: string;
    profileImage: string;
    id: string;
    experience: number;
  };
};

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  allServices: Product[];
}
