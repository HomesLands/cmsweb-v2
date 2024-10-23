import { IApiResponse, ICreateRole, IPaginationResponse, IQuery, IRole, IUpdateRole } from '@/types'
import { http } from '@/utils'

export async function getRoles(params: IQuery): Promise<IApiResponse<IPaginationResponse<IRole>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IRole>>>('/roles', {
    params
  })
  return response.data
}

export async function createRole(values: ICreateRole): Promise<IApiResponse<IRole>> {
  const response = await http.post<IApiResponse<IRole>>('/roles', values)
  return response.data
}

export async function updateRole(values: IUpdateRole): Promise<IApiResponse<IRole>> {
  const response = await http.patch<IApiResponse<IRole>>(`/roles/${values.slug}`, values)
  return response.data
}

export async function deleteRole(slug: string): Promise<IApiResponse<IRole>> {
  const response = await http.delete<IApiResponse<IRole>>(`/roles/${slug}`)
  return response.data
}
