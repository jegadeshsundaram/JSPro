export interface User {
  _id: string
  fullName: string,
  username: string,  
  email: string,
  phone: string,
  profilePic: string,
  userToken?: string
}

export interface AuthState {
  loading: boolean,
  isAuthenticated: boolean,
  userInfo: User | null
  userToken: string | null
  error: string | null
  success: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  fullName: string
  email: string
  username: string
  password: string
}

export interface ApiError {
  message: string
  stack?: string
}