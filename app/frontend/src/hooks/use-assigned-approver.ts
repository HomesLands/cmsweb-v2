import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createAssignedApprover,
  deleteAssignedApprover,
  getAssignedApprovers,
  updateAssignedApprover
} from '@/api'
import { IQuery, IUpdateAssignedApprover, TCreateAssignedApprover } from '@/types'

export const useCreateAssignedApprover = () => {
  return useMutation({
    mutationFn: async (data: TCreateAssignedApprover) => {
      return createAssignedApprover(data)
    }
  })
}

export const useAssignedApprovers = (q: IQuery) => {
  return useQuery({
    queryKey: ['assigned-approver', JSON.stringify(q)],
    queryFn: () => getAssignedApprovers(q),
    select: (data) => data.result
  })
}

export const useUpdateAssignedApprover = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: IUpdateAssignedApprover) => updateAssignedApprover(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['assigned-approver'] })
    }
  })
}

export const useDeleteAssignedApprover = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (slug: string) => {
      return deleteAssignedApprover(slug)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['assigned-approver'] })
    }
  })
}
