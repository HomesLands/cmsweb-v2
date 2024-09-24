import { IApiResponse, IErrorCode } from '@/types'
import { http } from '@/utils'

export async function getErrorCode(): Promise<IApiResponse<IErrorCode>> {
  const response = await http.get('/errorCodes')
  return response.data
}
