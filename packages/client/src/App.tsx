import { Flex } from '@chakra-ui/react'
import MainRoutes from './routes'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { selectUser } from './features/auth/redux/authSelectors'
import { useEffect } from 'react'
import { getUser } from './features/auth/redux/authActions'

const App = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser()).unwrap()
    }

    if (!user) {
      fetchUser()
    }
  }, [user, dispatch])
  return (
    <Flex minH={'100vh'} width={'100vw'} align={'center'} justify={'center'}>
      <MainRoutes />
    </Flex>
  )
}

export default App
