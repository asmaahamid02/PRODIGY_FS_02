import { Navigate, Outlet, useLocation } from 'react-router-dom'
import UnauthorizedScreen from '../screens/errors/UnauthorizedScreen'
import LoadingScreen from '../screens/feedback/LoadingScreen'

const ProtectedRoute = ({ roles }: { roles: string[] }) => {
  const location = useLocation()
  const authUser = null
  const role = ''
  const loading = false

  const userHasRequiredRole = authUser && roles.includes(role)

  if (loading) {
    return <LoadingScreen />
  }

  if (!authUser) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (!userHasRequiredRole) {
    return <UnauthorizedScreen />
  }

  return <Outlet />
}

export default ProtectedRoute
