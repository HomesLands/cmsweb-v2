import { useMutation } from '@tanstack/react-query'

import { createAssignedApprover } from '@/api/assigned-approver'
import { IApiResponse, TAssignedApprover } from '@/types'

export const useAssignedApprover = () => {
  return useMutation<IApiResponse<TAssignedApprover>, Error, TAssignedApprover>({
    mutationFn: createAssignedApprover
  })
}
