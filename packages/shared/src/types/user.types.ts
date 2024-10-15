export enum RoleEnum {
  user,
  admin,
}

export interface IBasicUser {
  id: string
  firstName: string
  lastName: string
  email: string
}
export interface IUser extends IBasicUser {
  role: RoleEnum
  createdAt: Date
}
