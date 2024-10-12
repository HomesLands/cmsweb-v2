import { IApiResponse, ICreateRolePermission, IRolePermission } from '@/types'
import { http } from '@/utils'

export async function createRolePermission(
  values: ICreateRolePermission
): Promise<IApiResponse<IRolePermission>> {
  const response = await http.post<IApiResponse<IRolePermission>>('/rolePermissions', values)
  return response.data
}
