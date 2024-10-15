import { useDisclosure } from '@chakra-ui/react'
import { IRole } from '@staffsphere/shared/src/types/role.types'
import FormModal from './FormModal'
import EditButton from '../../../components/EditButton'

const EditRecord = ({ record }: { record: IRole }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <EditButton onClick={onOpen} />

      <FormModal isOpen={isOpen} onClose={onClose} record={record} />
    </>
  )
}

export default EditRecord
