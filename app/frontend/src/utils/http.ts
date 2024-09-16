import axios from 'axios'
import NProgress from 'nprogress'
import moment from 'moment'

import { useRequestStore } from '@/stores/request.store'
import { showErrorToast } from './toast'
import { toLogin } from '@/router'
import { useUserStore } from '@/stores'
import { IError } from '@/types'

interface RefreshTokenResponse {
  code: string
  message: string
  result: {
    token: string
    refreshToken: string
    expireTime: string
  }
}

NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true
})

function isTokenExpired(expireTime: string): boolean {
  if (!expireTime) return true

  const expirationTime = moment(expireTime)
  const now = moment()

  return now.isAfter(expirationTime)
}

async function refreshTokenAPI(expiredToken: string, refreshToken: string): Promise<string> {
  try {
    const response = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh', {
      expiredToken,
      refreshToken
    })
    console.log('Check response', response)
    const { token, expireTime } = response.data.result
    useUserStore.setState({ token, expireTime })
    return token
  } catch (error: unknown) {
    const err = error as IError
    console.error('Failed to refresh tokennn:', err.response.data)
    if (err.response.data.code === 400) {
      showErrorToast(err.response.data.code)
    }
    return Promise.reject(err.response.data)
  }
}

// ... existing code ...

const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str
  } catch (err) {
    return false
  }
}

const decodeToken = (token: string): string | null => {
  try {
    console.log('Check token in decodeToken', token)
    if (token && isBase64(token)) {
      return atob(token)
    } else {
      console.error('Token is not correctly encoded in base64')
      return null
    }
  } catch (e) {
    console.error('Failed to decode token:', e)
    return null
  }
}

const decodeRefreshToken = (refreshToken: string): string | null => {
  try {
    if (refreshToken && isBase64(refreshToken)) {
      return atob(refreshToken)
    } else {
      console.error('Refresh token is not correctly encoded in base64')
      return null
    }
  } catch (e) {
    console.error('Failed to decode refresh token:', e)
    return null
  }
}

// ... existing code ...

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState()
    console.log({ token })
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      if (!(config as { doNotShowLoading?: boolean })?.doNotShowLoading) {
        const requestStore = useRequestStore.getState()
        if (requestStore.requestQueueSize === 0) {
          NProgress.start()
        }
        requestStore.incrementRequestQueueSize()
      }
      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config || {}

    if (!(config as { doNotShowLoading?: boolean })?.doNotShowLoading) {
      setProgressBarDone()
    }
    return response
  },
  async (error) => {
    const config = error.config || {}

    if (!config.doNotShowLoading) {
      setProgressBarDone()
    }

    if (error.response) {
      const { code, expireTime } = error.response.data

      if (code === 400) {
        showErrorToast(code)
      }

      // if (code === 401 && !config._retry) {
      //   config._retry = true
      //   try {
      //     const currentToken = localStorage.getItem('token')
      //     const refreshToken = localStorage.getItem('refreshToken')

      //     if (currentToken && refreshToken) {
      //       const decodedRefreshToken = decodeRefreshToken(refreshToken)
      //       console.log('Check encodedRefreshToken in interceptor response', decodedRefreshToken)
      //       console.log('Check currentToken in interceptor response', currentToken)

      //       if (decodedRefreshToken) {
      //         const newToken = await refreshTokenAPI(currentToken, decodedRefreshToken)
      //         console.log('Check newToken in interceptor response', newToken)
      //         // localStorage.setItem('token', newToken)

      //         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      //         config.headers['Authorization'] = `Bearer ${newToken}`

      //         return axiosInstance.request(config)
      //       }
      //     }
      //   } catch (err) {
      //     showErrorToast(code)
      //     // toLogin()
      //     return Promise.reject(error)
      //   }
      // }

      if (code === 500) {
        showErrorToast(code)
      }

      // if (isTokenExpired(expireTime)) {
      //   showErrorToast(code)
      //   // toLogin()
      // }
    }
    return Promise.reject(error)
  }
)

async function setProgressBarDone() {
  useRequestStore.setState({ requestQueueSize: useRequestStore.getState().requestQueueSize - 1 })
  if (useRequestStore.getState().requestQueueSize > 0) {
    NProgress.inc()
  } else {
    NProgress.done()
  }
}

export default axiosInstance
