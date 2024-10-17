import {
  Button,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  type BoxProps,
} from '@chakra-ui/react'
import React from 'react'
import NavItem from './NavItem'
import { FiHome, FiUsers } from 'react-icons/fi'
import { FaStaylinked } from 'react-icons/fa'
import { BsBuildingGear } from 'react-icons/bs'
import { GrUserSettings } from 'react-icons/gr'
import { RiLogoutCircleLine } from 'react-icons/ri'
import useLogout from '../hooks/useLogout'

type TProps = {
  onClose: () => void
} & BoxProps

const SidebarContent: React.FC<TProps> = ({ onClose, ...rest }) => {
  const { logoutUser } = useLogout()

  return (
    <VStack
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      position='fixed'
      height='100vh'
      zIndex={1}
      overflow={'hidden'}
      {...rest}
    >
      <Flex
        px={4}
        alignItems='center'
        justifyContent='space-between'
        position={'fixed'}
        width={'100%'}
        h={20}
      >
        <Text
          fontSize='2xl'
          fontWeight='bold'
          color={'purple.600'}
          display={'flex'}
          alignItems={'center'}
          textTransform={'uppercase'}
        >
          <FaStaylinked color={'purple.600'} />
          StaffSphere
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack
        align='start'
        spacing={2}
        p={4}
        mt={20}
        overflowY={'auto'}
        width={'100%'}
        height={'100%'}
      >
        <NavItem to={'/'} icon={FiHome}>
          Home
        </NavItem>
        <NavItem to={'/employees'} icon={FiUsers}>
          Employees
        </NavItem>
        <NavItem to={'/roles'} icon={GrUserSettings}>
          Roles
        </NavItem>
        <NavItem to={'/departments'} icon={BsBuildingGear}>
          Departments
        </NavItem>
        <Button
          variant={'ghost'}
          colorScheme='red'
          alignItems={'center'}
          display={'flex'}
          gap={2}
          fontSize={'lg'}
          onClick={logoutUser}
        >
          <RiLogoutCircleLine />
          Logout
        </Button>
      </VStack>
    </VStack>
  )
}

export default SidebarContent
