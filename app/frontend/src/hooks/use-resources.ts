import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createResource, getResources } from '@/api'
import { ICreateResource, IQuery } from '@/types'

export const useResources = (q: IQuery) => {
  return useQuery({
    queryKey: ['resources', JSON.stringify(q)],
    queryFn: () => getResources(q),
    select: (data) => data.result
  })
}

export const useCreateResource = () => {
  return useMutation({
    mutationFn: async (data: ICreateResource) => {
      return createResource(data)
    }
  })
}

export const useUpdateResource = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ICreateResource) => createResource(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resources'] })
  })
}
