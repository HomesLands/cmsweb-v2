import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getNotification, updateNotification } from '@/api'
import { IQuery } from '@/types'

export const useNotification = (q: IQuery) => {
  return useQuery({
    queryKey: ['notifications', JSON.stringify(q)],
    queryFn: () => getNotification(q),
    placeholderData: keepPreviousData
  })
}

export const useUpdateNotification = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => updateNotification(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
}
