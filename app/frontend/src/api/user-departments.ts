import {
  IApiResponse,
  ICreateUserDepartment,
  IUpdateUserDepartment,
  IUserDepartment
} from '@/types'
import { http } from '@/utils'

export async function createUserDepartment(
  values: ICreateUserDepartment
): Promise<IApiResponse<IUserDepartment>> {
  const response = await http.post<IApiResponse<IUserDepartment>>('/userDepartments', values)
  return response.data
}

export async function updateUserDepartment(
  values: IUpdateUserDepartment
): Promise<IApiResponse<IUserDepartment>> {
  const response = await http.patch<IApiResponse<IUserDepartment>>(
    `/userDepartments/${values.slug}`,
    values
  )
  return response.data
}

export async function deleteUserDepartment(slug: string): Promise<IApiResponse<IUserDepartment>> {
  const response = await http.delete<IApiResponse<IUserDepartment>>(`/userDepartments/${slug}`)
  return response.data
}
