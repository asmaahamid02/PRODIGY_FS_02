import { IBasicDepartment } from './department.types'
import { IBasicUser, IUser } from './user.types'

export interface IEmployee {
  id: string
  phone: string | null
  hireDate: string
  jobTitle: string
  salary: string
  managerId: string | null
  roleId: string
  departmentId: string | null
  createdAt: string
  updatedAt: string
  user: IBasicUser
  manager: IUser | null
  department?: IBasicDepartment | null
}
