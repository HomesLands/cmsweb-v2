import { IApiResponse, ISite } from '@/types'
import { http } from '@/utils'

export async function getSites(): Promise<IApiResponse<ISite[]>> {
  const response = await http.get('/sites')
  return response.data
}
