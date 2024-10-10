import { IApiResponse, IPaginationResponse, IQuery, IResource } from '@/types'
import { http } from '@/utils'

export async function getResources(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IResource>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IResource>>>('/resources', {
    params
  })
  return response.data
}

// export async function createRole(values: ICreateRole): Promise<IApiResponse<IRole>> {
//   const response = await http.post<IApiResponse<IRole>>('/roles', values)
//   return response.data
// }
