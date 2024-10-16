import { useAppDispatch } from '../store/hooks'
import { useToast } from '@chakra-ui/react'
import { logout } from '../features/auth/redux/authActions'
import { errorMessage } from '../utils/error.utils'

const useLogout = () => {
  const dispatch = useAppDispatch()
  const toast = useToast()

  const logoutUser = async () => {
    try {
      await dispatch(logout()).unwrap()
    } catch (error) {
      console.log('🚀 ~ Logout ~ error:', error)
      toast({
        title: errorMessage(error),
        status: 'error',
      })
    }
  }

  return { logoutUser }
}

export default useLogout
