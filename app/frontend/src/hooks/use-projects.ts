import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getProjects } from '@/api'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    placeholderData: keepPreviousData
  })
}
