import { IconButton } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

const AddButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <IconButton
      colorScheme='purple'
      size='lg'
      onClick={onOpen}
      aria-label='Add department'
      rounded={'full'}
      icon={<FiPlus />}
    />
  )
}

export default AddButton
