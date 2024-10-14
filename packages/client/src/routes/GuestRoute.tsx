import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingScreen from '../screens/feedback/LoadingScreen'
import {
  selectIsAuthenticated,
  selectStatus,
} from '../features/auth/redux/authSelectors'
import { useSelector } from 'react-redux'

const GuestRoute = () => {
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const status = useSelector(selectStatus)

  if (status === 'loading') {
    return <LoadingScreen />
  }

  return isAuthenticated ? (
    <Navigate replace to={location.state?.from || '/'} />
  ) : (
    <Outlet />
  )
}

export default GuestRoute
