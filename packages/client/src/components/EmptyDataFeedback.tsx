import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { FC } from 'react'

type TProps = {
  status?: 'error' | 'info' | 'success' | 'warning' | 'loading'
  title: string
  description?: string
}
const EmptyDataFeedback: FC<TProps> = ({
  status = 'info',
  title,
  description,
}) => {
  return (
    <Alert
      status={status}
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      p={8}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {title}
      </AlertTitle>

      {description && (
        <AlertDescription maxWidth='sm'>{description}</AlertDescription>
      )}
    </Alert>
  )
}

export default EmptyDataFeedback
