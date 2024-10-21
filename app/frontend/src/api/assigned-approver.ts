import {
  IApiResponse,
  IPaginationResponse,
  IQuery,
  TAssignedApprover,
  TCreateAssignedApprover
} from '@/types'
import { http } from '@/utils'

export async function createAssignedApprover(
  data: TCreateAssignedApprover
): Promise<IApiResponse<TAssignedApprover>> {
  const response = await http.post('/assignedUserApprovals', data)
  return response.data
}

export async function getAssignedApprovers(
  params: IQuery
): Promise<IApiResponse<TAssignedApprover[]>> {
  const response = await http.get<IApiResponse<TAssignedApprover[]>>('/assignedUserApprovals', {
    params
  })
  return response.data
}
