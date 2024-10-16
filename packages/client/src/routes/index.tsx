import { Routes, Route } from 'react-router-dom'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'
import LoginScreen from '../screens/LoginScreen'
import { ROLE } from './roles'
import HomeScreen from '../screens/HomeScreen'
import AdminLayout from '../layouts/AdminLayout'
import EmployeesScreen from '../screens/EmployeesScreen'
import RolesScreen from '../screens/RolesScreen'
import DepartmentsScreen from '../screens/DepartmentsScreen'

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path={'/login'} element={<LoginScreen />} />
      </Route>

      <Route element={<ProtectedRoute />}></Route>

      <Route element={<ProtectedRoute roles={[ROLE.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path={'/'} index element={<HomeScreen />} />
          <Route path={'/employees'} index element={<EmployeesScreen />} />
          <Route path={'/roles'} index element={<RolesScreen />} />
          <Route path={'/departments'} index element={<DepartmentsScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainRoutes
