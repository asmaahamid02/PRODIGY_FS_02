import { selectUser } from '../features/auth/redux/authSelectors'
import { ROLE } from '../routes/roles'
import { useAppSelector } from '../store/hooks'
import DashboardScreen from './DashboardScreen'

const HomeScreen = () => {
  const user = useAppSelector(selectUser)

  if (user?.role.toString() === ROLE.ADMIN) {
    return <DashboardScreen />
  }

  return <div>HomeScreen</div>
}

export default HomeScreen
