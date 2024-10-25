import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getNotification } from '@/api'

export const useNotification = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotification(),
    placeholderData: keepPreviousData
  })
}
