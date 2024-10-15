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
  budget: Prisma.Decimal
  managerId?: string
}

export interface IEmployeeRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  hireDate: Date
  jobTitle: string
  salary: Prisma.Decimal
  roleId: string
  managerId?: string
  departmentId?: string
}
