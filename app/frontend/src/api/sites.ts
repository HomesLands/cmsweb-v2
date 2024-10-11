import { IApiResponse, ICreateSite, ISite } from '@/types'
import { http } from '@/utils'

export async function getSites(): Promise<IApiResponse<ISite[]>> {
  const response = await http.get('/sites')
  return response.data
}

export async function createSite(data: ICreateSite) {
  const response = await http.post('/sites', data)
  return response.data
}
