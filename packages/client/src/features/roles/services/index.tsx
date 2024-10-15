import { IRole } from '@staffsphere/shared/src/types/role.types'
import { axiosInstance } from '../../../config/axios.config'
import { IRoleRequest } from '@staffsphere/shared/src/types/requests.types'

export interface IGetRolesResponse {
  data: { roles: IRole[] }
  meta: IRolesMeta
}

export interface IRolesMeta {
  totalRoles: number
  totalPages: number
  currentPage: number
  perPage: number
  nextPage: number | null
}

export const getRoles = async (
  page: number,
  per_page: number
): Promise<IGetRolesResponse> => {
  const response = await axiosInstance.get(
    `/roles?page=${page}&per_page=${per_page}`,
    { withCredentials: true }
  )
  return response.data
}

export const addRole = async (
  data: IRoleRequest
): Promise<{ data: { role: IRole } }> => {
  const response = await axiosInstance.post('/roles', data)
  return response.data
}

export const updateRole = async (
  data: IRoleRequest,
  id: string
): Promise<{ data: { role: IRole } }> => {
  const response = await axiosInstance.put(`/roles/${id}`, data, {
    withCredentials: true,
  })
  return response.data
}

export const deleteRole = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/roles/${id}`, {
    withCredentials: true,
  })
  return response.data
}
