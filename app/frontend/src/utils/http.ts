// src/http.ts
import axios from 'axios'
import NProgress from 'nprogress'
import moment from 'moment'

import { useRequestStore } from '@/stores/request.store'
import { showErrorToast } from './toast'
import { useToLogin } from '@/router'
import { useUserStore } from '@/stores'

interface RefreshTokenResponse {
  code: string
  message: string
  result: {
    token: string
    expireTime: string
  }
}

NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true
})

Object.assign(axios.defaults, {
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true
})

function isTokenExpired(expireTime: string): boolean {
  if (!expireTime) return true

  const expirationTime = moment(expireTime, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')
  const now = moment()

  return now.isAfter(expirationTime)
}

function refreshToken(token: string) {
  return axiosInstance.post<RefreshTokenResponse>('/auth/refresh', { token }).then((response) => {
    const { token, expireTime } = response.data.result
    useUserStore.setState({ token, expireTime })
    return token
  })
}

axiosInstance.interceptors.request.use(
  (config) => {
    const { token, expireTime } = useUserStore.getState()
    if (token && expireTime && isTokenExpired(expireTime)) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    if (!(config as { doNotShowLoading?: boolean })?.doNotShowLoading) {
      const requestStore = useRequestStore.getState()
      if (requestStore.requestQueueSize === 0) {
        NProgress.start()
      }
      requestStore.incrementRequestQueueSize()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Đảm bảo config tồn tại
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
      const { data, status } = error.response
      console.log(data)

      if (isTokenExpired(data.expireTime)) {
        console.log('token expired')
        showErrorToast(data.code)
        console.log('useToLogin in http')
        useToLogin()
        return Promise.reject(error)
      }

      if (status === 400) {
        showErrorToast(data.code)
      }

      if (status === 401 || status === 403) {
        try {
          const currentToken = useUserStore.getState().token
          if (currentToken) {
            const newToken = await refreshToken(currentToken)
            error.config.headers.Authorization = `Bearer ${newToken}`
            return axiosInstance.request(error.config)
          } else {
            showErrorToast(data.code)
            console.log('useToLogin in http')
            useToLogin()
          }
          return Promise.reject(error)
        } catch {
          showErrorToast(data.code)
          console.log('useToLogin in http')
          useToLogin()
          return Promise.reject(error)
        }
      }

      if (status === 500) {
        showErrorToast(data.code)
      }
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
