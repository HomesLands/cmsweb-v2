import { IApiResponse, ICompanyInfo } from '@/types'
import { http } from '@/utils'

export async function getCompanies() {
  const response = await http.get<IApiResponse<ICompanyInfo>>('/companies')
  return response
}

export async function createCompany(data: ICompanyInfo) {
  const response = await http.post<IApiResponse<ICompanyInfo>>('/companies', data)
  return response
}
