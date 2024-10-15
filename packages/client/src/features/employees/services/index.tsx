import { IEmployee } from '@staffsphere/shared/src/types/employee.types'
import { IMeta } from '@staffsphere/shared/src/types/general.type'
import { axiosInstance } from '../../../config/axios.config'

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
    url += `?page=${page}&per_page=${per_page}`
  }

  const response = await axiosInstance.get(url, { withCredentials: true })
  return response.data
}
