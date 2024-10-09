export enum RoleEnum {
  user,
  admin,
}

export interface IBasicUser {
  id: string
  email: string
  role: RoleEnum
}

export interface IUser extends IBasicUser {
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}
