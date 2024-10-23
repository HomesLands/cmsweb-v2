import { IApiResponse, ICreateSite, ISite, IUpdateSite } from '@/types'
import { http } from '@/utils'

export async function getSites(): Promise<IApiResponse<ISite[]>> {
  const response = await http.get('/sites')
  return response.data
}

export async function createSite(data: ICreateSite) {
  const response = await http.post('/sites', data)
  return response.data
}
export async function updateSite(data: IUpdateSite) {
  const response = await http.patch(`/sites/${data.slug}`, data)
  return response.data
}

export async function deleteSite(slug: string) {
  const response = await http.delete(`/sites/${slug}`)
  return response.data
}
