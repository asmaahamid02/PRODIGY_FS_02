import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

type TProps = {
  to: string
  icon?: React.ElementType
  children: React.ReactNode
}
const NavItem: React.FC<TProps> = ({ to, icon, children, ...rest }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        width: '100%',
        color: isActive ? '#805AD5' : 'black',
      })}
    >
      <Flex
        align='center'
        p='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        width={'100%'}
        _hover={{
          bg: 'purple.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && <Box mr='4' as={icon} />}
        {children}
      </Flex>
    </NavLink>
  )
}

export default NavItem
