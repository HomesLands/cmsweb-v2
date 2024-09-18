import { AxiosError, isAxiosError } from 'axios'
import {
  IApiResponse,
  ILoginResponse,
  ILogoutRequest,
  IRefreshTokenResponse,
  IRegisterRequest
} from '@/types'
import { http, showErrorToast, showToast } from '@/utils'
import { useAuthStore } from '@/stores'
import { jwtDecode } from 'jwt-decode'

export async function registerApi(params: IRegisterRequest): Promise<IApiResponse<void>> {
  try {
    const response = await http.post<IApiResponse<void>>('/auth/register', params)
    showToast('Đăng ký thành công')
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<IApiResponse<void>>
      if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
    }
    throw error
  }
}

export async function loginApi(params: {
  username: string
  password: string
}): Promise<IApiResponse<ILoginResponse>> {
  const response = await http.post<IApiResponse<ILoginResponse>>('/auth/authenticate', params)
  if (response.data.result?.token) {
    const decodedToken = jwtDecode(response.data.result.token) as { sub: string }
    useAuthStore.getState().setSlug(decodedToken.sub)
  }
  return response.data
}

export async function getRefreshToken({
  expiredToken,
  refreshToken
}: {
  expiredToken: string
  refreshToken: string
}) {
  try {
    return await http
      .post<IApiResponse<IRefreshTokenResponse>>('/auth/refresh', {
        expiredToken,
        refreshToken
      })
      .then((response) => {
        const result = response.data.result
        if (result) {
          const { token, expireTime } = result
          const decodedToken = jwtDecode(token) as { sub: string }
          useAuthStore.setState({ token, expireTime, slug: decodedToken.sub })
          return { token, expireTime }
        } else {
          throw new Error('Invalid response data')
        }
      })
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<IApiResponse<void>>
      if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
    }
    throw error
  }
}

export async function logoutApi(data: ILogoutRequest) {
  try {
    const response = await http.post<IApiResponse<void>>('/auth/logout', data)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<IApiResponse<void>>
      if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
    }
    throw error
  }
}
