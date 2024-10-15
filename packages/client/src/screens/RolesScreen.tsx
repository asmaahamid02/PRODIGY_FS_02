import { Button, useDisclosure } from '@chakra-ui/react'
import RolesModal from '../features/roles/components/RolesModal'
import RolesList from '../features/roles/components/RolesList'
import MainScreenLayout from '../layouts/MainScreenLayout'

const RolesScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout
      headerChildren={
        <Button colorScheme='purple' size='lg' onClick={onOpen}>
          Add Role
        </Button>
      }
    >
      <RolesList />

      <RolesModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default RolesScreen
