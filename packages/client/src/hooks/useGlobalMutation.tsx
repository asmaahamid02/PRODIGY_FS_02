import { useToast } from '@chakra-ui/react'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { errorMessage } from '../utils/error.utils'

type GlobalMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext>

const useGlobalMutation = <TData, TError, TVariables, TContext>(
  options: GlobalMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const toast = useToast()

  return useMutation({
    ...options,
    onError: (
      error: TError,
      variables: TVariables,
      context: TContext | undefined
    ) => {
      console.log('Mutation error: ', error)

      toast({
        title: errorMessage(error),
        status: 'error',
      })

      if (options.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}

export default useGlobalMutation
