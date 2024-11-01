import { IApiResponse, ICreateProject, IProject, IUpdateProject } from '@/types'
import { http } from '@/utils'

export async function getProjects(): Promise<IApiResponse<IProject[]>> {
  const response = await http.get<IApiResponse<IProject[]>>('/projects')
  return response.data
}

export async function createProject(data: ICreateProject): Promise<IApiResponse<IProject>> {
  const response = await http.post<IApiResponse<IProject>>('/projects', data)
  return response.data
}

export async function updateProject(data: IUpdateProject): Promise<IApiResponse<IProject>> {
  const response = await http.patch<IApiResponse<IProject>>(`/projects/${data.slug}`, data)
  return response.data
}

export async function deleteProject(slug: string): Promise<IApiResponse<IProject>> {
  const response = await http.delete<IApiResponse<IProject>>(`/projects/${slug}`)
  return response.data
}
