import {
  Box,
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

type TProps = {
  onClose: () => void
} & BoxProps

const SidebarContent: React.FC<TProps> = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
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
      <VStack align='start' spacing={2} p={4}>
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
      </VStack>
    </Box>
  )
}

export default SidebarContent
