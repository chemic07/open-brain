export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserSignUpPayload {
  userName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
