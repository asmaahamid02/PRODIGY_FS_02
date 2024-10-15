import { useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { errorMessage } from '../../../utils/error.utils'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import EmptyDataFeedback from '../../../components/EmptyDataFeedback'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import { getAll, IGetEmployeesResponse } from '../services'
import DeleteRecord from './DeleteRecord'
import EditRecord from './EditRecord'

const List = () => {
  const toast = useToast()

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.EMPLOYEES],
    getNextPageParam: (prevData: IGetEmployeesResponse) =>
      prevData.meta?.nextPage,
    queryFn: ({ pageParam }) => getAll(true, pageParam, 5),
    initialPageParam: 1,
  })

  useEffect(() => {
    if (isError) {
      toast({
        title: errorMessage(error),
        status: 'error',
      })
    }
  }, [isError, error, toast])

  const rows = useMemo(() => {
    if (
      !data ||
      !data.pages ||
      !data.pages[0] ||
      data.pages[0].data.employees.length === 0
    )
      return []
    return data.pages.flatMap(
      (page: IGetEmployeesResponse) => page.data.employees
    )
  }, [data])

  if (isLoading) return <LoadingSkeleton />

  return (
    <Box width={'full'} py={4}>
      {rows.length > 0 ? (
        <>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th isNumeric>#</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Manager</Th>
                  <Th>Hire date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row, index) => (
                  <Tr key={row.id}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{`${row.user.firstName} ${row.user.lastName}`}</Td>
                    <Td>{row.user.email}</Td>
                    <Td>{row.role?.title}</Td>
                    <Td>
                      {row.manager ? (
                        <VStack align={'start'}>
                          <Text
                            fontWeight={'bold'}
                          >{`${row.manager?.user.firstName} ${row.manager?.user.lastName}`}</Text>
                          <Text>{row.manager?.user.email}</Text>
                        </VStack>
                      ) : null}
                    </Td>

                    <Td>{new Date(row.hireDate).toLocaleDateString()}</Td>
                    <Td>
                      <HStack>
                        <DeleteRecord id={row.id} />
                        <EditRecord record={row} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {hasNextPage && (
            <Button
              variant={'ghost'}
              colorScheme='purple'
              mt={4}
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        <EmptyDataFeedback
          title='No employees found'
          description='Create a new employees to get started'
        />
      )}
    </Box>
  )
}

export default List
