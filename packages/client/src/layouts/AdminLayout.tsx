import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import SidebarContent from '../components/SidebarContent'
import { FiMenu } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <HStack
      spacing={0}
      bg={useColorModeValue('gray.100', 'gray.900')}
      overflow={'hidden'}
      height='100vh'
      width={'full'}
    >
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={{ base: 'full', sm: 'xs' }}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Flex
        flexDirection={'column'}
        className='v-stack'
        width={'full'}
        ml={{ base: 0, md: 60 }}
        overflow={'hidden'}
        height='100vh'
      >
        {/* Mobile Hamburger Icon */}
        <Flex
          as={'header'}
          px={4}
          alignItems='center'
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth='1px'
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          position={'sticky'}
          top={0}
          zIndex={1}
          height={'60px'}
        >
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant='outline'
            aria-label='open menu'
            icon={<FiMenu />}
          />
          <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
            Dashboard
          </Text>
        </Flex>

        {/* Main Content Area */}
        <Box as='main' p='4' overflowY={'hidden'} h='full' flex={1}>
          <Box
            px={6}
            pb={6}
            bg='white'
            borderRadius='md'
            boxShadow='md'
            width={'full'}
            h='full'
            overflowY={'auto'}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </HStack>
  )
}

export default AdminLayout
