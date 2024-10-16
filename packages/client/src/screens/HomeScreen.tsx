import { selectUser } from '../features/auth/redux/authSelectors'
import AdminLayout from '../layouts/AdminLayout'
import { ROLE } from '../routes/roles'
import { useAppSelector } from '../store/hooks'
import EmployeeScreen from './EmployeeScreen'
import DashboardScreen from './DashboardScreen'

const HomeScreen = () => {
  const user = useAppSelector(selectUser)

  if (user?.role.toString() === ROLE.ADMIN) {
    return (
      <AdminLayout>
        <DashboardScreen />
      </AdminLayout>
    )
  }

  return <EmployeeScreen />
}

export default HomeScreen
