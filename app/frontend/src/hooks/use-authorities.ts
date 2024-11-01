import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createAuthority, deleteAuthority, getAuthorities, updateAuthority } from '@/api'
import { ICreateAuthority, IQuery, IUpdateAuthority } from '@/types'

export const useAuthorities = (q: IQuery) => {
  return useQuery({
    queryKey: ['authorities', JSON.stringify(q)],
    queryFn: () => getAuthorities(q),
    placeholderData: keepPreviousData,
    select: (data) => data.result
  })
}

export const useCreateAuthority = () => {
  return useMutation({
    mutationFn: async (data: ICreateAuthority) => {
      return createAuthority(data)
    }
  })
}

export const useUpdateAuthority = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdateAuthority) => updateAuthority(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authorities'] })
    }
  })
}

export const useDeleteAuthority = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => {
      return deleteAuthority(slug)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authorities'] })
    }
  })
}
