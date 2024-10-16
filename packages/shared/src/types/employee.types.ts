import { IBasicDepartment, IDepartment } from './department.types'
import { IBasicUser, IUser } from './user.types'

export interface IEmployee {
  id: string
  phone: string | null
  hireDate: string
  jobTitle: string
  salary: number
  managerId: string | null
  roleId: string
  departmentId: string | null
  createdAt: string
  updatedAt: string
  user: IBasicUser
  manager: IEmployee | null
  department?: IDepartment | null
  role?: { title: string } | null
  subordinates?: IEmployee[] | null
}
