import {
  BackgroundProps,
  ColorProps,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC } from 'react'

type TProps = {
  title: string
  count: number | string
  bg?: BackgroundProps['bgGradient']
  color?: ColorProps['color']
}

const DashboardCard: FC<TProps> = ({ title, count, bg, color }) => {
  return (
    <GridItem w='100%'>
      <VStack
        align={'start'}
        p={6}
        boxShadow='md'
        rounded='md'
        bgGradient={bg ? bg : 'linear(to-r, teal.500, green.400)'}
        color={color ? color : 'white'}
      >
        <Heading
          fontWeight={'normal'}
          textTransform={'uppercase'}
          size={{ base: 'sm', md: 'md' }}
        >
          {title}
        </Heading>
        <Text fontWeight={'medium'} fontSize={{ base: 'xl', md: '3xl' }}>
          {count}
        </Text>
      </VStack>
    </GridItem>
  )
}

export default DashboardCard
