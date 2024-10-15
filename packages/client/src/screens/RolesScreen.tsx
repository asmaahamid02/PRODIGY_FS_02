import { Button, IconButton, useDisclosure } from '@chakra-ui/react'
import RolesModal from '../features/roles/components/RolesModal'
import RolesList from '../features/roles/components/RolesList'
import MainScreenLayout from '../layouts/MainScreenLayout'
import { FiPlus } from 'react-icons/fi'

const RolesScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout
      headerChildren={
        <IconButton
          colorScheme='purple'
          size='lg'
          onClick={onOpen}
          aria-label='Add role'
          rounded={'full'}
          icon={<FiPlus />}
        />
      }
    >
      <RolesList />

      <RolesModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default RolesScreen
