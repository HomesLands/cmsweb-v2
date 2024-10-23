import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createSite, deleteSite, getSites, updateSite } from '@/api'
import { ICreateSite, IUpdateSite } from '@/types'

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

export const useUpdateSite = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUpdateSite) => updateSite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] })
    }
  })
}

export const useDeleteSite = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => deleteSite(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] })
    }
  })
}
