import { IApiResponse, IAuthority, ICreateAuthority, IPaginationResponse, IQuery } from '@/types'
import { http } from '@/utils'

export async function getAuthorities(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IAuthority>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IAuthority>>>('/authorities', {
    params
  })
  return response.data
}

export async function createAuthority(values: ICreateAuthority): Promise<IApiResponse<IAuthority>> {
  const response = await http.post<IApiResponse<IAuthority>>('/authorities', values)
  return response.data
}
