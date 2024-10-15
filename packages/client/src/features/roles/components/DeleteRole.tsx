import { IconButton, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import AlertConfirmation from '../../../components/AlertConfirmation'
import { QueryClient } from '@tanstack/react-query'
import { deleteRole } from '../services'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'

const queryClient = new QueryClient()

type TProps = {
  roleId: string
}
const DeleteRole: FC<TProps> = ({ roleId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate, isPending } = useGlobalMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLES] })
    },
  })

  return (
    <>
      <IconButton
        size='sm'
        colorScheme='red'
        aria-label='Delete role'
        icon={<RiDeleteBinLine />}
        onClick={onOpen}
        isLoading={isPending}
      />

      <AlertConfirmation
        header='Delete role'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => mutate(roleId)}
        isLoading={isPending}
      />
    </>
  )
}

export default DeleteRole
