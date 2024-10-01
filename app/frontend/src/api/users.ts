import { IApiResponse, IPaginationResponse, IQuery } from '@/types'
import { IUserInfo, IUserRoleResponse } from '@/types/user.type'
import { http } from '@/utils'

export async function getUsers(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IUserInfo>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IUserInfo>>>('/users', {
    params
  })
  return response.data
}

export async function getUser() {
  const response = await http.get<IApiResponse<IUserInfo>>(`/users/info`)
  return response.data
}

export async function getUserInfoPermission(): Promise<IApiResponse<IUserRoleResponse[]>> {
  const response = await http.get<IApiResponse<IUserRoleResponse[]>>(`/users/info/permissions`)
  return response.data
}
