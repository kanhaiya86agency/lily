export interface UserProfileType {
  firstName: string;
  lastName: string;
  location: string;
  latitude: number | string;
  longitude: number | string;
  profileImage: string;
  languages: string[];
  phone: string;
  email: string;
  experience: number;
  deviceToken: string;
  isPhoneVerified: string;
  isEmailVerified: string;
}

export interface UserState {
  user: UserProfileType | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}
