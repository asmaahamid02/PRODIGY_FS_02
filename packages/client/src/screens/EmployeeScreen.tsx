import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../utils/constants.utils'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../features/auth/redux/authSelectors'
import { getOne } from '../features/employees/services'
import { GiSevenPointedStar } from 'react-icons/gi'
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { errorMessage } from '../utils/error.utils'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EmptyDataFeedback from '../components/EmptyDataFeedback'
import { RiLogoutCircleLine } from 'react-icons/ri'
import useLogout from '../hooks/useLogout'

const EmployeeScreen = () => {
  const user = useAppSelector(selectUser)
  const toast = useToast()
  const { logoutUser } = useLogout()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES, user?.id],
    queryFn: () => getOne(user?.id as string),
  })

  useEffect(() => {
    if (isError) {
      toast({
        title: errorMessage(error),
        status: 'error',
      })
    }
  }, [isError, error, toast])

  if (isLoading)
    return (
      <Box p={8}>
        <LoadingSkeleton />
      </Box>
    )

  const { employee } = data?.data || {}

  return (
    <VStack width={'full'} height={'100vh'} p={8}>
      {/* / department name, employees that he manages) */}
      <Card
        width={'full'}
        border={'1px'}
        borderColor={'gray.200'}
        p={4}
        maxW={'3xl'}
        height={'full'}
        overflowY={'auto'}
      >
        <HStack justify={'end'}>
          <IconButton
            aria-label='Logout'
            icon={<RiLogoutCircleLine />}
            onClick={logoutUser}
          />
        </HStack>
        {employee ? (
          <>
            <CardHeader>
              <HStack width={'full'}>
                <Avatar
                  bg={'purple.500'}
                  color={'white'}
                  name={`${employee.user.firstName} ${employee.user.lastName}`}
                />
                <VStack alignItems={'start'} spacing={0}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    {`${employee.user.firstName} ${employee.user.lastName}`}
                  </Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    {employee.user.email}
                  </Text>
                </VStack>
              </HStack>

              <Heading
                as={'h3'}
                size={'md'}
                my={4}
                textAlign={'center'}
                textTransform={'uppercase'}
                color={'gray.500'}
              >
                Welcome to StaffSphere
              </Heading>

              <HStack width={'full'} mt={4} justifyContent={'center'}>
                <Badge colorScheme='green'>{employee.role?.title}</Badge>
              </HStack>
            </CardHeader>

            <CardBody>
              <Heading size='md' mb={4}>
                {`${employee.jobTitle} since ${new Date(
                  employee.hireDate
                ).toLocaleDateString()}`}
              </Heading>

              <Stack divider={<StackDivider />} spacing='4'>
                {employee.phone && (
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Phone
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {employee.phone}
                    </Text>
                  </Box>
                )}
                {employee.manager && (
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Manager
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {`${employee.manager?.user.firstName} ${employee.manager?.user.lastName}`}
                    </Text>
                    <Text pt='2' fontSize='sm'>
                      {employee.manager?.user.email}
                    </Text>
                    {employee.manager?.phone && (
                      <Text pt='2' fontSize='sm'>
                        {employee.manager?.phone}
                      </Text>
                    )}
                  </Box>
                )}
                {employee.department && (
                  <>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Department
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        {employee.department.name}
                      </Text>
                    </Box>
                  </>
                )}

                {employee.subordinates && employee.subordinates.length > 0 && (
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Employees managed
                    </Heading>
                    <List spacing={1} mt={4}>
                      {employee.subordinates.map((subordinate) => (
                        <ListItem key={subordinate.id}>
                          <ListIcon
                            as={GiSevenPointedStar}
                            color='purple.500'
                          />
                          {`${subordinate.user.firstName} ${subordinate.user.lastName} - ${subordinate.user.email}`}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {employee.department &&
                  employee.department.employees &&
                  employee.department.employees.length > 0 && (
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Co-workers
                      </Heading>
                      <List spacing={1} mt={4}>
                        {employee.department.employees.map((item) => (
                          <ListItem key={item.id}>
                            <ListIcon
                              as={GiSevenPointedStar}
                              color='purple.500'
                            />
                            {`${item.user.firstName} ${item.user.lastName} - ${item.user.email}`}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
              </Stack>
            </CardBody>
          </>
        ) : (
          <CardBody>
            <EmptyDataFeedback title='No data found' />
          </CardBody>
        )}
      </Card>
    </VStack>
  )
}

export default EmployeeScreen
