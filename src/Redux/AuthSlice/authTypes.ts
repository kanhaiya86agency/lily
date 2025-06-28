export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  id: string;
}
