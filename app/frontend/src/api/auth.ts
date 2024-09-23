import { IApiResponse, ILoginResponse, ILogoutRequest, IRegisterRequest } from '@/types'
import { http } from '@/utils'

export async function registerApi(params: IRegisterRequest): Promise<IApiResponse<void>> {
  const response = await http.post<IApiResponse<void>>('/auth/register', params)
  return response.data
}

export async function loginApi(params: {
  username: string
  password: string
}): Promise<IApiResponse<ILoginResponse>> {
  const response = await http.post<IApiResponse<ILoginResponse>>('/auth/authenticate', params)
  return response.data
}

export async function logoutApi(data: ILogoutRequest) {
  const response = await http.post<IApiResponse<void>>('/auth/logout', data)
  return response
}
