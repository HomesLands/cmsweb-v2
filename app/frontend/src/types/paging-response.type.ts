export interface IPagingResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pages: number
}
