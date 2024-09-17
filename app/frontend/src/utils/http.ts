import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'
import moment from 'moment'

import { useRequestStore } from '@/stores/request.store'
import { useUserStore } from '@/stores'
import { IApiResponse, IRefreshTokenResponse } from '@/types'

NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

let isRefreshing = false
let failedQueue: { resolve: (token: string) => void; reject: (error: unknown) => void }[] = []
const baseURL = import.meta.env.VITE_BASE_API_URL
console.log({ baseURL })

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
      useUserStore.getState()
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

      // showErrorToast(code)

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
