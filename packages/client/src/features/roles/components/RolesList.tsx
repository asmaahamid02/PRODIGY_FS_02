import { useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getRoles, IGetRolesResponse } from '../services'
import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { errorMessage } from '../../../utils/error.utils'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import EmptyDataFeedback from '../../../components/EmptyDataFeedback'
import { QUERY_KEYS } from '../../../utils/constants.utils'
import DeleteRole from './DeleteRole'
import EditRole from './EditRole'

const RolesList = () => {
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
    queryKey: [QUERY_KEYS.ROLES],
    getNextPageParam: (prevData: IGetRolesResponse) => prevData.meta?.nextPage,
    queryFn: ({ pageParam }) => getRoles(pageParam, 5),
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

  const roles = useMemo(() => {
    if (
      !data ||
      !data.pages ||
      !data.pages[0] ||
      data.pages[0].data.roles.length === 0
    )
      return []
    return data.pages.flatMap((page: IGetRolesResponse) => page.data.roles)
  }, [data])

  if (isLoading) return <LoadingSkeleton />

  return (
    <Box width={'full'} py={4}>
      {roles.length > 0 ? (
        <>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th isNumeric>#</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Created At</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roles.map((role, index) => (
                  <Tr key={role.id}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{role.title}</Td>
                    <Td>{role.description}</Td>
                    <Td>{new Date(role.createdAt).toDateString()}</Td>
                    <Td>
                      <HStack>
                        <DeleteRole roleId={role.id} />
                        <EditRole role={role} />
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
          title='No roles found'
          description='Create a new role to get started'
        />
      )}
    </Box>
  )
}

export default RolesList

// const columnHelper = createColumnHelper<IRole>()

// const columns = useMemo(
//   () => [
//     columnHelper.accessor('title', {
//       header: 'Title',
//       cell: (props) => props.getValue(),
//     }),

//     columnHelper.accessor('description', {
//       header: 'Description',
//       cell: (props) => props.getValue(),
//     }),
//     columnHelper.display({
//       id: 'actions',
//       cell: (props) => <></>,
//     }),
//   ],
//   [columnHelper]
// )

// const table = useReactTable<IRole>({
//   columns,
//   data: rows,
//   getCoreRowModel: getCoreRowModel(),
// })
