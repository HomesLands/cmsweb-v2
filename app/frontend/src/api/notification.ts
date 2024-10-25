import { IApiResponse, INotification, IPaginationResponse, IQuery } from '@/types'
import { http } from '@/utils'

export async function getNotification(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<INotification>>> {
  try {
    const response = await http.get<IApiResponse<IPaginationResponse<INotification>>>(
      '/notifications',
      {
        params
      }
    )
    return response.data
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function updateNotification(slug: string) {
  const response = await http.post<IApiResponse<INotification>>(`/notifications/${slug}/read`)
  return response.data
}
