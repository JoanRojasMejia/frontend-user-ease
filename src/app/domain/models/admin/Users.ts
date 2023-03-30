export interface Users {
  _id: string
  name: string
  email: string
  last_name: string
  business: Business
  type: number
  updated_at: Date
  created_at: Date
}

export interface Business {
  _id: string
  name: string
  color: string
  nit: string
}

export type newUser = {
  name: string
  email: string
  last_name: string
  business: string
  password: string
  password_confirmation: string
}
