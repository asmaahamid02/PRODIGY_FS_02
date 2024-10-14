import { Navigate, Outlet, useLocation } from 'react-router-dom'
import UnauthorizedScreen from '../screens/errors/UnauthorizedScreen'
import LoadingScreen from '../screens/feedback/LoadingScreen'
import { selectStatus, selectUser } from '../features/auth/redux/authSelectors'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ roles }: { roles?: string[] }) => {
  const location = useLocation()
  const user = useSelector(selectUser)
  const status = useSelector(selectStatus)

  const userHasRequiredRole = !roles
    ? true
    : user && roles.includes(user.role.toString())

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (!userHasRequiredRole) {
    return <UnauthorizedScreen />
  }

  return <Outlet />
}

export default ProtectedRoute
