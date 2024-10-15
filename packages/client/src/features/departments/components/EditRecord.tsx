import { useDisclosure } from '@chakra-ui/react'
import { IDepartment } from '@staffsphere/shared/src/types/department.types'
import FormModal from './FormModal'
import EditButton from '../../../components/EditButton'

const EditRecord = ({ record }: { record: IDepartment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <EditButton onClick={onOpen} />

      <FormModal isOpen={isOpen} onClose={onClose} record={record} />
    </>
  )
}

export default EditRecord
