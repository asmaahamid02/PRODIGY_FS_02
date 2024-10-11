import { Routes, Route } from 'react-router-dom'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'
import LoginScreen from '../screens/LoginScreen'
import { ROLE } from './roles'

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path={'/login'} element={<LoginScreen />} />
      </Route>

      <Route element={<ProtectedRoute roles={[ROLE.ADMIN]} />}></Route>
    </Routes>
  )
}

export default MainRoutes
