// src/axios.d.ts
import 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    doNotShowLoading?: boolean
  }
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<AxiosResponse<T>>
  }
}
