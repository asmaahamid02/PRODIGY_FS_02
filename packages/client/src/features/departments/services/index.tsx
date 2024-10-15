import { axiosInstance } from '../../../config/axios.config'
import { IDepartmentRequest } from '@staffsphere/shared/src/types/requests.types'
import { IMeta } from '@staffsphere/shared/src/types/general.type'
import { IDepartment } from '@staffsphere/shared/src/types/department.types'

export interface IGetDepartmentsResponse {
  data: { departments: IDepartment[] }
  meta: IMeta
}

export const getAll = async (
  paginated: boolean = false,
  page?: number,
  per_page?: number
): Promise<IGetDepartmentsResponse> => {
  let url = '/departments'

  if (paginated) {
    url += `?page=${page}&per_page=${per_page}`
  }

  const response = await axiosInstance.get(url, { withCredentials: true })
  return response.data
}

export const addRecord = async (
  data: IDepartmentRequest
): Promise<{ data: { department: IDepartment } }> => {
  const response = await axiosInstance.post('/departments', data)
  return response.data
}

export const updateRecord = async (
  data: IDepartmentRequest,
  id: string
): Promise<{ data: { department: IDepartment } }> => {
  const response = await axiosInstance.put(`/departments/${id}`, data, {
    withCredentials: true,
  })
  return response.data
}

export const deleteRecord = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/departments/${id}`, {
    withCredentials: true,
  })
  return response.data
}
