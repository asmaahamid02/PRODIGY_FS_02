import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingScreen from '../screens/feedback/LoadingScreen'

const GuestRoute = () => {
  const location = useLocation()

  const authUser = null
  const loading = false

  if (loading) {
    return <LoadingScreen />
  }

  return authUser ? (
    <Navigate replace to={location.state?.from || '/'} />
  ) : (
    <Outlet />
  )
}

export default GuestRoute
