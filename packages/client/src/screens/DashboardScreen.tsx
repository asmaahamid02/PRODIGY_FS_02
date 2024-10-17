import {
  Avatar,
  Box,
  Grid,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import DashboardCard from '../features/dashboard/components/DashboardCard'
import { useQuery } from '@tanstack/react-query'
import { getStatistics } from '../features/dashboard/services'
import { QUERY_KEYS } from '../utils/constants.utils'
import { useEffect } from 'react'
import { errorMessage } from '../utils/error.utils'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../features/auth/redux/authSelectors'
import { formatNumber } from '../utils/helper.utils'

const DashboardScreen = () => {
  const toast = useToast()
  const user = useAppSelector(selectUser)

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getStatistics(),
    queryKey: [QUERY_KEYS.STATISTICS],
  })

  useEffect(() => {
    if (isError) {
      toast({
        title: errorMessage(error),
        status: 'error',
      })
    }
  }, [isError, error, toast])

  const {
    totalEmployees = 0,
    totalRoles = 0,
    totalDepartments = 0,
    totalAddedEmployees = 0,
    totalAddedRoles = 0,
    totalAddedDepartments = 0,
    totalExpenses = 0,
  } = data?.data || {}

  if (isLoading)
    return (
      <Box p={8}>
        <LoadingSkeleton />
      </Box>
    )

  return (
    <>
      <HStack
        justifyContent={{ base: 'end', md: 'space-between' }}
        position={'sticky'}
        top={0}
        zIndex={1}
        bg='white'
        py={4}
        borderBottom={'1px'}
        borderColor={'gray.200'}
      >
        <Heading
          as='h1'
          textTransform={'uppercase'}
          size={{ base: 'md', md: 'lg' }}
          display={{ base: 'none', md: 'inline' }}
        >
          Dashboard
        </Heading>

        <HStack>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <Avatar
            bg='purple.500'
            color={'white'}
            name={user?.firstName + ' ' + user?.lastName}
          />
        </HStack>
      </HStack>

      <VStack spacing={4} align='center' py={8}>
        <Heading
          as='h1'
          size={{ base: 'lg', md: '2xl' }}
          color='purple.600'
          textAlign={'center'}
        >
          Employee Management System
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color='gray.500'
          textAlign={'center'}
        >
          Manage Roles, Departments, and Employees effortlessly.
        </Text>
      </VStack>

      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={8}
        justifyItems='center'
        mt={6}
      >
        {/* Roles Card */}
        <DashboardCard title='roles' count={totalRoles} />
        <DashboardCard title='departments' count={totalDepartments} />
        <DashboardCard title='employees' count={totalEmployees} />
      </Grid>

      <VStack
        my={4}
        border={'1px'}
        borderColor={'gray.200'}
        p={6}
        rounded={'md'}
        color={'gray.600'}
      >
        <Heading as={'h2'} size={{ base: 'md', md: 'lg' }}>
          Total expenses
        </Heading>

        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={'bold'}>
          ${formatNumber(totalExpenses) ?? 0}
        </Text>
      </VStack>

      <Box mt={12}>
        <Heading
          as='h2'
          textTransform={'uppercase'}
          size={{ base: 'md', md: 'lg' }}
        >
          Last 30 days
        </Heading>

        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={8}
          justifyItems='center'
          mt={4}
        >
          <DashboardCard
            title='roles'
            count={`${totalAddedRoles}+`}
            bg={'white'}
            color={'gray.600'}
          />
          <DashboardCard
            title='departments'
            count={`${totalAddedDepartments}+`}
            bg={'white'}
            color={'gray.600'}
          />
          <DashboardCard
            title='employees'
            count={`${totalAddedEmployees}+`}
            bg={'white'}
            color={'gray.600'}
          />
        </Grid>
      </Box>
    </>
  )
}

export default DashboardScreen
