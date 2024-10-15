import { IApiResponse, ICreateDepartment, IDepartment } from '@/types'
import { http } from '@/utils'

export async function getDepartments() {
  const response = await http.get<IApiResponse<IDepartment[]>>('/departments')
  return response.data
}

export async function createDepartment(data: ICreateDepartment) {
  const response = await http.post<IApiResponse<IDepartment>>('/departments', data)
  return response.data
}
