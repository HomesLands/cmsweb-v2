import { useUserStore } from '@/stores'
import { ILogin, IRefreshToken, IRegister, IRegisterResponse } from '@/types'
import http from '@/utils/http'
import { showErrorToast, showToast } from '@/utils/toast'

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

export async function refreshToken() {
  const userStore = useUserStore.getState()
  const response = await http.post<IRefreshToken>('/auth/refresh')
  userStore.setToken(response.data.token)
}

export async function logout() {
  const userStore = useUserStore.getState()
  userStore.logout()
}
