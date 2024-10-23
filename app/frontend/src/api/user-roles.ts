import { IApiResponse, ICreateUserRole, IUserRole } from '@/types'
import { http } from '@/utils'

export async function createUserRole(values: ICreateUserRole): Promise<IApiResponse<IUserRole>> {
  const response = await http.post<IApiResponse<IUserRole>>('/userRoles', values)
  return response.data
}

export async function deleteUserRole(slug: string): Promise<IApiResponse<IUserRole>> {
  const response = await http.delete<IApiResponse<IUserRole>>(`/userRoles/${slug}`)
  return response.data
}
