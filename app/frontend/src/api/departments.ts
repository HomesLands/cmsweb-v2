import { IApiResponse, ICreateDepartment, IDepartment, IUpdateDepartment } from '@/types'
import { http } from '@/utils'

export async function getDepartments() {
  const response = await http.get<IApiResponse<IDepartment[]>>('/departments')
  return response.data
}

export async function createDepartment(data: ICreateDepartment) {
  const response = await http.post<IApiResponse<IDepartment>>('/departments', data)
  return response.data
}

export async function updateDepartment(data: IUpdateDepartment) {
  const response = await http.patch<IApiResponse<IDepartment>>(`/departments/${data.slug}`, data)
  return response.data
}

export async function deleteDepartment(slug: string) {
  const response = await http.delete<IApiResponse<IDepartment>>(`/departments/${slug}`)
  return response.data
}
