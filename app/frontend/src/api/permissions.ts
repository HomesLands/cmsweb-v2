import { IApiResponse, ICreatePermission, IPaginationResponse, IPermission, IQuery } from '@/types'
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
