import { IApiResponse, ICompany } from '@/types'
import { http } from '@/utils'

export async function getCompanies() {
  const response = await http.get<IApiResponse<ICompany>>('/companies')
  return response.data
}

export async function createCompany(data: ICompany) {
  const response = await http.post<IApiResponse<ICompany>>('/companies', data)
  return response
}
