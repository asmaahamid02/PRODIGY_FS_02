import { Skeleton, Stack } from '@chakra-ui/react'

const LoadingSkeleton = ({ length = 10 }: { length?: number }) => {
  return (
    <Stack width={'full'}>
      {Array.from({ length }).map((_, index) => (
        <Skeleton height='20px' key={index} />
      ))}
    </Stack>
  )
}

export default LoadingSkeleton
