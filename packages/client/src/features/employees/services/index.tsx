import { IEmployee } from '@staffsphere/shared/src/types/employee.types'
import { IMeta } from '@staffsphere/shared/src/types/general.type'
import { axiosInstance } from '../../../config/axios.config'
import { IEmployeeRequest } from '@staffsphere/shared/src/types/requests.types'

export interface IGetEmployeesResponse {
  data: {
    employees: IEmployee[]
  }
  meta: IMeta
}

export const getAll = async (
  paginated: boolean = false,
  page?: number,
  per_page?: number
): Promise<IGetEmployeesResponse> => {
  let url = '/employees'

  if (paginated) {
    url += `?page=${page}&per_page=${per_page}&paginated=${paginated}`
  }

  const response = await axiosInstance.get(url, { withCredentials: true })
  return response.data
}

export const addRecord = async (
  data: IEmployeeRequest
): Promise<{ data: { department: IEmployee } }> => {
  const response = await axiosInstance.post('/employees', data)
  return response.data
}

export const updateRecord = async (
  data: IEmployeeRequest,
  id: string
): Promise<{ data: { department: IEmployee } }> => {
  const response = await axiosInstance.put(`/employees/${id}`, data, {
    withCredentials: true,
  })
  return response.data
}

export const deleteRecord = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/employees/${id}`, {
    withCredentials: true,
  })
  return response.data
}
