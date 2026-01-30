export interface Token {
  totalRemaining: number;
  lastRefillDate: Date;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  plan: string;
  tokens: Token;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
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
