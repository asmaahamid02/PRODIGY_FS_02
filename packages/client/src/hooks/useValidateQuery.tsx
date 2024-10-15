import { useQueryClient } from '@tanstack/react-query'

const useValidateQuery = () => {
  const queryClient = useQueryClient()

  const validateQuery = (key: string[]) =>
    queryClient.invalidateQueries({ queryKey: key })

  return { validateQuery }
}

export default useValidateQuery
