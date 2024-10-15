import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import AlertConfirmation from '../../../components/AlertConfirmation'
import { deleteRecord } from '../services'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'
import useValidateQuery from '../../../hooks/useValidateQuery'
import DeleteButton from '../../../components/DeleteButton'

type TProps = {
  id: string
}
const DeleteRecord: FC<TProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { validateQuery } = useValidateQuery()

  const { mutate, isPending } = useGlobalMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      validateQuery([QUERY_KEYS.ROLES])
    },
  })

  return (
    <>
      <DeleteButton onClick={onOpen} isLoading={isPending} />

      <AlertConfirmation
        header='Delete role'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => mutate(id)}
        isLoading={isPending}
      />
    </>
  )
}

export default DeleteRecord
