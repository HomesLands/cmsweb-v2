import { TDeleteRolePermissionSchema } from '@/schemas'
import {
  IApiResponse,
  ICreateRolePermission,
  IRolePermission,
  IUpdateRolePermission
} from '@/types'
import { http } from '@/utils'

export async function createRolePermission(
  values: ICreateRolePermission
): Promise<IApiResponse<IRolePermission>> {
  const response = await http.post<IApiResponse<IRolePermission>>('/rolePermissions', values)
  return response.data
}

export async function updateRolePermission(
  values: IUpdateRolePermission
): Promise<IApiResponse<IRolePermission>> {
  const response = await http.put<IApiResponse<IRolePermission>>(
    `/rolePermissions/${values.rolePermissionSlug}`,
    values
  )
  return response.data
}

export async function deleteRolePermission(
  data: TDeleteRolePermissionSchema
): Promise<IApiResponse<IRolePermission>> {
  const response = await http.delete<IApiResponse<IRolePermission>>(
    `/rolePermissions/${data.rolePermissionSlug}`
  )
  return response.data
}
