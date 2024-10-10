import { TAssignedApprover } from '@/types'
import { http } from '@/utils'

export async function createAssignedApprover(data: TAssignedApprover) {
  const response = await http.post('/assignedUserApprovals', data)
  return response.data
}

export async function getAssignedApprover(data: TAssignedApprover) {
  // const response = await http.get('/assignedUserApprovals', data)
  // return response.data
}
