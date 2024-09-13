export interface IPagingResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pages: number
}

export interface IRegisterResponse<T> {
  data: T
  message: string
  code: number
}

export interface IResponse<T> {
  data: T
  message: string
  code: number
}
