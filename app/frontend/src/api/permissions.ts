import {
  IApiResponse,
  ICreatePermission,
  IPaginationResponse,
  IPermission,
  IQuery,
  IUpdatePermission
} from '@/types'
import { http } from '@/utils'

export async function getPermissions(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IPermission>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IPermission>>>('/permissions', {
    params
  })
  return response.data
}

export async function createPermission(
  values: ICreatePermission
): Promise<IApiResponse<IPermission>> {
  const response = await http.post<IApiResponse<IPermission>>('/permissions', values)
  return response.data
}

export async function updatePermission(
  values: IUpdatePermission
): Promise<IApiResponse<IPermission>> {
  const response = await http.patch<IApiResponse<IPermission>>(
    `/permissions/${values.slug}`,
    values
  )
  return response.data
}

export async function deletePermission(slug: string): Promise<IApiResponse<IPermission>> {
  const response = await http.delete<IApiResponse<IPermission>>(`/permissions/${slug}`)
  return response.data
}
