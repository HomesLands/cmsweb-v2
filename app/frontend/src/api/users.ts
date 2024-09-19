import { IApiResponse, IPaginationResponse, IUserInfo, IUserQuery } from '@/types'
import { http } from '@/utils'

export async function getUsers(
  params: IUserQuery
): Promise<IApiResponse<IPaginationResponse<IUserInfo>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IUserInfo>>>('/users', {
    params
  })
  return response.data
}

export async function getUser(slug: string) {
  const response = await http.get<IApiResponse<IUserInfo>>(`/users/${slug}`)
  return response.data
}
