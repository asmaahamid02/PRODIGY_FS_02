import { ILoginRequest } from '@staffsphere/shared/src/types/requests.types'
import { axiosInstance } from '../../../config/axios.config'
import { IUser } from '@staffsphere/shared/src/types/user.types'

export interface ILoginResponse {
  message: string
  user: IUser
}

export interface IGetUserResponse {
  data: {
    user: IUser
  }
}

export const loginService = async (
  data: ILoginRequest
): Promise<ILoginResponse> => {
  const response = await axiosInstance.post('/auth/login', data)
  return response.data
}

export const getUserService = async (): Promise<IGetUserResponse> => {
  const response = await axiosInstance.get('/users')
  return response.data
}
