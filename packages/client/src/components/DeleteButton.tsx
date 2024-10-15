import { ButtonProps, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const DeleteButton: FC<ButtonProps> = (props) => {
  return (
    <IconButton
      size='sm'
      colorScheme='red'
      aria-label='Delete department'
      icon={<RiDeleteBinLine />}
      {...props}
    />
  )
}

export default DeleteButton
