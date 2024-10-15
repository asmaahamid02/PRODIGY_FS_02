import { useDisclosure } from '@chakra-ui/react'
import FormModal from './FormModal'
import EditButton from '../../../components/EditButton'
import { IEmployee } from '@staffsphere/shared/src/types/employee.types'

const EditRecord = ({ record }: { record: IEmployee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <EditButton onClick={onOpen} />

      <FormModal isOpen={isOpen} onClose={onClose} record={record} />
    </>
  )
}

export default EditRecord
