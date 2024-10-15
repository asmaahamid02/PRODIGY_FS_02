import { useDisclosure } from '@chakra-ui/react'
import RolesModal from '../features/roles/components/RolesModal'
import RolesList from '../features/roles/components/RolesList'
import MainScreenLayout from '../layouts/MainScreenLayout'
import AddButton from '../components/AddButton'

const RolesScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout headerChildren={<AddButton onOpen={onOpen} />}>
      <RolesList />

      <RolesModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default RolesScreen
