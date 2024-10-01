import { TCreateRoleSchema } from '@/schemas'
import { IApiResponse, ICreateRole, IQuery, IRole } from '@/types'
import { http } from '@/utils'

export async function getRoles(params: IQuery): Promise<IApiResponse<IRole[]>> {
  const response = await http.get<IApiResponse<IRole[]>>('/roles', {
    params
  })
  return response.data
}

export async function createRole(values: ICreateRole): Promise<IApiResponse<IRole>> {
  const response = await http.post<IApiResponse<IRole>>('/roles', values)
  return response.data
}
