export interface IApiResponse<T> {
  code: number
  error: boolean
  message: string
  method: string
  path: string
  result: T
}

export interface IPaginationResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pages: number
}
