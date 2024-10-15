import { ButtonProps, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { FiEdit3 } from 'react-icons/fi'

const EditButton: FC<ButtonProps> = (props) => {
  return (
    <IconButton
      size='sm'
      aria-label='Edit department'
      colorScheme='green'
      icon={<FiEdit3 />}
      {...props}
    />
  )
}

export default EditButton
