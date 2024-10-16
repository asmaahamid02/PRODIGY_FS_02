import { IStatistics } from '@staffsphere/shared/src/types/general.type'
import { axiosInstance } from '../../../config/axios.config'

export interface IGetStatisticsResponse {
  data: IStatistics
}

export const getStatistics = async (): Promise<IGetStatisticsResponse> => {
  const response = await axiosInstance.get('/statistics', {
    withCredentials: true,
  })
  return response.data
}
