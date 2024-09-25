import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getErrorCode } from '@/api'

export const useErrorCode = () => {
  return useQuery({
    queryKey: ['errorCodes'],
    queryFn: () => getErrorCode(),
    placeholderData: keepPreviousData
  })
}
