export interface RegisterBody {
  client: string
  product: string
  username: string
  email: string
  password: string
}

export interface LoginBody {
  username: string
  email: string
  password: string
}