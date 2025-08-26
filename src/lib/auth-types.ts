export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  phone?: string
  joinDate: string
  status: "active" | "suspended"
  borrowedBooks: string[]
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}