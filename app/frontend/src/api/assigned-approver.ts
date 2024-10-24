import {
  IApiResponse,
  IAssignedApprover,
  IQuery,
  IUpdateAssignedApprover,
  TCreateAssignedApprover
} from '@/types'
import { http } from '@/utils'

export async function createAssignedApprover(
  data: TCreateAssignedApprover
): Promise<IApiResponse<IAssignedApprover>> {
  const response = await http.post('/assignedUserApprovals', data)
  return response.data
}

export async function getAssignedApprovers(
  params: IQuery
): Promise<IApiResponse<IAssignedApprover[]>> {
  const response = await http.get<IApiResponse<IAssignedApprover[]>>('/assignedUserApprovals', {
    params
  })
  return response.data
}

export async function updateAssignedApprover(
  data: IUpdateAssignedApprover
): Promise<IApiResponse<IAssignedApprover>> {
  const response = await http.patch(`/assignedUserApprovals/${data.slug}`, data)
  return response.data
}

export async function deleteAssignedApprover(
  slug: string
): Promise<IApiResponse<IAssignedApprover>> {
  const response = await http.delete(`/assignedUserApprovals/${slug}`)
  return response.data
}
