export interface IAdminRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ILoginRequest {
  email: string
  password: string
}
