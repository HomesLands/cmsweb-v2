import { useMutation, useQuery } from '@tanstack/react-query'

import { createAssignedApprover, getAssignedApprovers } from '@/api'
import { IQuery, TCreateAssignedApprover } from '@/types'

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
