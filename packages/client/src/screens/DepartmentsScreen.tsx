import MainScreenLayout from '../layouts/MainScreenLayout'
import { useDisclosure } from '@chakra-ui/react'
import List from '../features/departments/components/List'
import FormModal from '../features/departments/components/FormModal'
import AddButton from '../components/AddButton'

const DepartmentsScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout headerChildren={<AddButton onOpen={onOpen} />}>
      <List />

      <FormModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default DepartmentsScreen
