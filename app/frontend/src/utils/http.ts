// src/http.ts
import axios from 'axios'
import NProgress from 'nprogress'

import { showErrorToast } from './toast'

import { useRequestStore } from '@/stores/request.store'
import { useToLogin } from '@/router'

interface ResponseData {
  code: string
}

NProgress.configure({ showSpinner: false, trickleSpeed: 200 })

Object.assign(axios.defaults, {
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true
})

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {} // Ensure headers is defined
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

const isTokenExpired = (status: number, data: ResponseData) =>
  status === 401 && ['TOKEN_EXPIRED'].includes(data.code)

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!response.config.doNotShowLoading) {
      setProgressBarDone()
    }
    return response
  },
  async (error) => {
    if (!error.config.doNotShowLoading) {
      setProgressBarDone()
    }
    if (error.response) {
      const { data, status } = error.response

      if (isTokenExpired(status, data)) {
        await showErrorToast(data.code)
        useToLogin()
        return Promise.reject(error)
      }

      if (status === 400) {
        showErrorToast(data.code)
      }

      if (status === 401) {
        // Handle token expiration (e.g., redirect to login)
        await showErrorToast(data.code)
        useToLogin()
        return Promise.reject(error)
      }

      if (status === 403) {
        // Handle unauthorized access (e.g., redirect to login)
        await showErrorToast(data.code)
        useToLogin()
        return Promise.reject(error)
      }

      if (status === 500) {
        // Handle server error (e.g., show error message)
        showErrorToast(data.code) // Use the new showErrorToast function
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

export default axios
