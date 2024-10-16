import { Button, Heading, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const UnauthorizedScreen = () => {
  return (
    <VStack
      width={'100%'}
      height={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Heading>You are not authorized to access this page</Heading>
      <Link to={'/'}>
        <Button colorScheme={'purple'}>Go Home</Button>
      </Link>
    </VStack>
  )
}

export default UnauthorizedScreen
