import { Prisma } from '@prisma/client'

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

export interface IRoleRequest {
  title: string
  description?: string | null
}

export interface IDepartmentRequest {
  name: string
  budget: number
  managerId?: string | null
}

export interface IEmployeeRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  hireDate: string
  jobTitle: string
  salary: number
  roleId: string
  managerId?: string | null
  departmentId?: string | null
}
