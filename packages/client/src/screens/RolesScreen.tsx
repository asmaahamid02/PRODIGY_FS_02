import { useDisclosure } from '@chakra-ui/react'
import MainScreenLayout from '../layouts/MainScreenLayout'
import AddButton from '../components/AddButton'
import FormModal from '../features/roles/components/FormModal'
import List from '../features/roles/components/List'

const RolesScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout headerChildren={<AddButton onOpen={onOpen} />}>
      <List />

      <FormModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default RolesScreen
