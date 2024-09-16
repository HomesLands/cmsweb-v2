import { ILogin, IRefreshTokenResponse, IRegister, IRegisterResponse } from '@/types'
import { http, showErrorToast, showToast } from '@/utils'
import { useUserStore } from '@/stores'

interface ApiError {
  response: {
    code: number
    message: string
  }
}

interface LoginError {
  response: {
    data: {
      code: number
      message: string
    }
  }
}

export async function registerForm(params: {
  fullname: string
  username: string
  password: string
}): Promise<IRegisterResponse<IRegister>> {
  try {
    const response = await http.post<IRegisterResponse<IRegister>>('/auth/register', params)
    showToast('Đăng ký thành công')
    return response.data
  } catch (error: unknown) {
    console.log(error)
    const apiError = error as ApiError
    if (apiError.response?.code) {
      const { code } = apiError.response
      showErrorToast(code)
    }
    throw error
  }
}

export async function loginForm(params: { username: string; password: string }): Promise<ILogin> {
  try {
    const response = await http.post<ILogin>('/auth/authenticate', params)
    showToast('Đăng nhập thành công')
    return response.data
  } catch (error: unknown) {
    const apiError = error as LoginError
    if (apiError.response?.data.code) {
      const { code } = apiError.response.data
      showErrorToast(code)
    }
    throw error
  }
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
      .post<IRefreshTokenResponse>('/auth/refresh', {
        expiredToken,
        refreshToken
      })
      .then((response) => {
        const result = response.data.result
        if (result) {
          const { token, expireTime } = result
          useUserStore.setState({ token, expireTime })
          return { token, expireTime }
        } else {
          throw new Error('Invalid response data')
        }
      })
  } catch (error: unknown) {
    console.log(error)
    const apiError = error as ApiError
    if (apiError.response?.code) {
      const { code, message } = apiError.response
      return { code, error: true, message }
    }
    return { token: '', expireTime: '' }
  }
}

// async function refreshTokenAPI(expiredToken: string, refreshToken: string): Promise<string> {
//   return await axiosInstance
//     .post<IRefreshTokenResponse>('/auth/refresh', { expiredToken, refreshToken })
//     .then((response) => {
//       const { token, expireTime } = response.data.result
//       useUserStore.setState({ token, expireTime })
//       return token
//     })
// }

export async function logout() {
  const userStore = useUserStore.getState()
  userStore.logout()
}
