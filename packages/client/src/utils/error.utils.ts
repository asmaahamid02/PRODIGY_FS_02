import { AxiosError } from 'axios'

export const errorMessage = (error: unknown): string => {
  console.log('error: ', error)

  if (error instanceof AxiosError) {
    return error.response?.data.errors[0].message || error.message
  } else if (error instanceof Error) {
    return error.message
  }

  console.error('Unknown error: ', error)
  return 'Something went wrong!'
}
