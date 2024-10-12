import { IApiResponse, ICreateUserDepartment, IUserDepartment } from '@/types'
import { http } from '@/utils'

export async function createUserDepartment(
  values: ICreateUserDepartment
): Promise<IApiResponse<IUserDepartment>> {
  const response = await http.post<IApiResponse<IUserDepartment>>('/userDepartments', values)
  return response.data
}
