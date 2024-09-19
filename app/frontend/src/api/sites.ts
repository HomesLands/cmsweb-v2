import { IApiResponse, IConstruction } from '@/types'
import { http } from '@/utils'

export async function getSites(): Promise<IApiResponse<IConstruction[]>> {
  const response = await http.get<IApiResponse<IConstruction[]>>('/sites')
  return response.data
}
