import { VStack } from '@chakra-ui/react'
import React from 'react'

const MainScreenLayout = ({
  headerChildren,
  children,
}: {
  headerChildren: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <>
      <VStack
        alignItems={'end'}
        position={'sticky'}
        top={0}
        zIndex={1}
        bg='white'
        py={4}
        borderBottom={'1px'}
        borderColor={'gray.200'}
      >
        {headerChildren}
      </VStack>

      {children}
    </>
  )
}

export default MainScreenLayout
