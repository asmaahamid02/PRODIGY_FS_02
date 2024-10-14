import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

const axiosInterceptors = (logout: () => Promise<void>) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        await logout()
      }
    }
  )
}

export { axiosInstance, axiosInterceptors }
