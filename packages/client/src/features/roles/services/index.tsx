import { IRole } from '@staffsphere/shared/src/types/role.types'
import { axiosInstance } from '../../../config/axios.config'
import { IRoleRequest } from '@staffsphere/shared/src/types/requests.types'
import { IMeta } from '@staffsphere/shared/src/types/general.type'

export interface IGetRolesResponse {
  data: { roles: IRole[] }
  meta: IMeta
}

export const getAll = async (
  paginated: boolean = false,
  page?: number,
  per_page?: number
): Promise<IGetRolesResponse> => {
  let url = '/roles'

  if (paginated) {
    url += `?page=${page}&per_page=${per_page}`
  }

  const response = await axiosInstance.get(url, { withCredentials: true })
  return response.data
}

export const addRecord = async (
  data: IRoleRequest
): Promise<{ data: { role: IRole } }> => {
  const response = await axiosInstance.post('/roles', data)
  return response.data
}

export const updateRecord = async (
  data: IRoleRequest,
  id: string
): Promise<{ data: { role: IRole } }> => {
  const response = await axiosInstance.put(`/roles/${id}`, data, {
    withCredentials: true,
  })
  return response.data
}

export const deleteRecord = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/roles/${id}`, {
    withCredentials: true,
  })
  return response.data
}
