import { IApiResponse, ICompany, ICreateCompany, IUpdateCompany } from '@/types'
import { http } from '@/utils'

export async function getCompanies() {
  const response = await http.get<IApiResponse<ICompany[]>>('/companies')
  return response.data
}

export async function createCompany(data: ICreateCompany) {
  const response = await http.post<IApiResponse<ICompany>>('/companies', data)
  return response.data
}

export async function uploadCompanyLogo(requestData: { slug: string; file: File }) {
  const formData = new FormData()
  formData.append('file', requestData.file)
  const response = await http.patch<IApiResponse<ICompany>>(
    `/companies/upload/${requestData.slug}`,
    formData
  )
  return response.data
}

export async function updateCompany(data: IUpdateCompany) {
  const response = await http.patch<IApiResponse<ICompany>>(`/companies/${data.slug}`, data)
  return response.data
}

export async function deleteCompany(slug: string) {
  const response = await http.delete<IApiResponse<ICompany>>(`/companies/${slug}`)
  return response.data
}
