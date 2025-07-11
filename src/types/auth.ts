export interface User {
  id: string
  email: string
  name?: string
  image?: string
  walletAddress?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}
