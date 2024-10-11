import { Box, Spinner } from '@chakra-ui/react'

const LoadingScreen = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'absolute'}
      inset={0}
      zIndex={10}
      backgroundColor={'rgba(0, 0, 0, 0.8)'}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='purple.500'
        size='xl'
      />
    </Box>
  )
}

export default LoadingScreen
