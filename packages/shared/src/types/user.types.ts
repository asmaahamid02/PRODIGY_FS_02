export enum RoleEnum {
  user,
  admin,
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: RoleEnum
  createdAt: Date
}
