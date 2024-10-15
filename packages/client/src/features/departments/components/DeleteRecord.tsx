import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import AlertConfirmation from '../../../components/AlertConfirmation'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import useGlobalMutation from '../../../hooks/useGlobalMutation'
import useValidateQuery from '../../../hooks/useValidateQuery'
import { deleteRecord } from '../services'
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
      validateQuery([QUERY_KEYS.DEPARTMENTS])
    },
  })

  return (
    <>
      <DeleteButton onClick={onOpen} isLoading={isPending} />

      <AlertConfirmation
        header='Delete department'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => mutate(id)}
        isLoading={isPending}
      />
    </>
  )
}

export default DeleteRecord
