import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getSites } from '@/api'

export const useSites = () => {
  return useQuery({
    queryKey: ['sites'],
    queryFn: () => getSites(),
    placeholderData: keepPreviousData
  })
}
