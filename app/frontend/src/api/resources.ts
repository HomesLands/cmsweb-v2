import {
  IApiResponse,
  ICreateResource,
  IPaginationResponse,
  IQuery,
  IResource,
  IUpdateResource
} from '@/types'
import { http } from '@/utils'

export async function getResources(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IResource>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IResource>>>('/resources', {
    params
  })
  return response.data
}

export async function createResource(values: ICreateResource): Promise<IApiResponse<IResource>> {
  const response = await http.post<IApiResponse<IResource>>('/resources', values)
  return response.data
}

export async function updateResource(values: IUpdateResource): Promise<IApiResponse<IResource>> {
  const response = await http.patch<IApiResponse<IResource>>(`/resources/${values.slug}`, values)
  return response.data
}
