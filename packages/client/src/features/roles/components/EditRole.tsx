import { IconButton, useDisclosure } from '@chakra-ui/react'
import { IRole } from '@staffsphere/shared/src/types/role.types'
import { FiEdit3 } from 'react-icons/fi'
import RolesModal from './RolesModal'

const EditRole = ({ role }: { role: IRole }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        size='sm'
        aria-label='Edit role'
        colorScheme='green'
        icon={<FiEdit3 />}
        onClick={onOpen}
      />

      <RolesModal isOpen={isOpen} onClose={onClose} role={role} />
    </>
  )
}

export default EditRole
