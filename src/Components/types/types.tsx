export type ServiceItem = {
  name: string;
  type: string;
  profile_image_url: string;
  description: string;
  location: string;
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
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
};
