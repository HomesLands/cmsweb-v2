import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { createSite, getSites } from '@/api'
import { ICreateSite } from '@/types'

export const useSites = () => {
  return useQuery({
    queryKey: ['sites'],
    queryFn: () => getSites(),
    placeholderData: keepPreviousData
  })
}

export const useCreateSite = () => {
  return useMutation({ mutationFn: (data: ICreateSite) => createSite(data) })
}
