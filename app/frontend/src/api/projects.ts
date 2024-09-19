import { IApiResponse, IProject } from '@/types'
import { http } from '@/utils'

export async function getProjects(): Promise<IApiResponse<IProject[]>> {
  const response = await http.get<IApiResponse<IProject[]>>('/projects')
  return response.data
}
