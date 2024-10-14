import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
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
    <Box
      minH='100vh'
      width={'100%'}
      bg={useColorModeValue('gray.100', 'gray.900')}
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

      {/* Mobile Hamburger Icon */}
      <Flex
        ml={{ base: 0, md: 60 }}
        px={4}
        height='20'
        alignItems='center'
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
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
      <Box ml={{ base: 0, md: 60 }} p='4'>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
