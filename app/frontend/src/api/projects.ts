import { IApiResponse, ICreateProject, IProject } from '@/types'
import { http } from '@/utils'

export async function getProjects(): Promise<IApiResponse<IProject[]>> {
  const response = await http.get<IApiResponse<IProject[]>>('/projects')
  return response.data
}

export async function createProject(data: ICreateProject): Promise<IApiResponse<IProject>> {
  const response = await http.post<IApiResponse<IProject>>('/projects', data)
  return response.data
}
