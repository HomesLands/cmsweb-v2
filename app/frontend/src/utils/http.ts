import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import moment from 'moment'

import { useRequestStore } from '@/stores/request.store'
import { useAuthStore } from '@/stores'
import { IApiResponse, IRefreshTokenResponse } from '@/types'
import { showErrorToast } from './toast'

NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

let isRefreshing = false
let failedQueue: { resolve: (token: string) => void; reject: (error: unknown) => void }[] = []
const baseURL = import.meta.env.VITE_BASE_API_URL

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

const isTokenExpired = (expiryTime: string): boolean => {
  const currentDate = moment()
  const expireDate = moment(expiryTime)
  return currentDate.isAfter(expireDate)
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { token, expireTime, refreshToken, setExpireTime, setToken, setLogout } =
      useAuthStore.getState()
    if (expireTime && isTokenExpired(expireTime) && !isRefreshing) {
      isRefreshing = true
      try {
        const response: AxiosResponse<IApiResponse<IRefreshTokenResponse>> = await axios.post(
          `${baseURL}/auth/refresh`,
          {
            refreshToken,
            expiredToken: token
          }
        )

        const newToken = response.data.result.token
        setToken(newToken)
        setExpireTime(response.data.result.expireTime)
        processQueue(null, newToken)
      } catch (error) {
        console.log({ error })
        processQueue(error, null)
        setLogout()
        // redirect('/auth/login')
        // You can redirect to the login page
        window.location.href = '/auth/login'
      } finally {
        isRefreshing = false
      }
    } else if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(config)
          },
          reject: (error: unknown) => {
            reject(error)
          }
        })
      })
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      if (!config?.doNotShowLoading) {
        const requestStore = useRequestStore.getState()
        if (requestStore.requestQueueSize === 0) {
          NProgress.start()
        }
        requestStore.incrementRequestQueueSize()
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.config?.doNotShowLoading) setProgressBarDone()
    return response
  },
  async (error) => {
    if (!error.config?.doNotShowLoading) setProgressBarDone()
    if (error.response) {
      const { code } = error.response.data
      const { status } = error.response

      if (status === 401) {
        showErrorToast(code)
      }

      if (status === 403) {
        showErrorToast(code)
        window.location.href = '/auth/login'
      }

      if (status === 404) {
        showErrorToast(code)
      }

      if (status === 500) {
        showErrorToast(code)
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
