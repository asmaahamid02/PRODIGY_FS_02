import { IEmployee } from './employee.types'

export interface IBasicDepartment {
  id: string
  name: string
}

export interface IDepartment extends IBasicDepartment {
  budget: number
  managerId: string
  createdAt: string
  updatedAt: string
  employees: IEmployee[]
  manager: IEmployee | null
  _count: {
    employees: number
  }
}
