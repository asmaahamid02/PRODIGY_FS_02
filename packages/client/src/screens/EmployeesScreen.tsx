import MainScreenLayout from '../layouts/MainScreenLayout'
import AddButton from '../components/AddButton'
import FormModal from '../features/employees/components/FormModal'
import List from '../features/employees/components/List'
import { useDisclosure } from '@chakra-ui/react'

const EmployeesScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <MainScreenLayout headerChildren={<AddButton onOpen={onOpen} />}>
      <List />

      <FormModal isOpen={isOpen} onClose={onClose} />
    </MainScreenLayout>
  )
}

export default EmployeesScreen
