import { IPagingResponse, IUserInfo } from '@/types'

import userData from './users.json'

export async function getUsers(params: {
  page: number
  pageSize: number
}): Promise<IPagingResponse<IUserInfo>> {
  try {
    const users: IUserInfo[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData.items)
      }, 1000)
    })

    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize

    const paginatedUsers = users.slice(startIndex, endIndex)

    const total = users.length
    const pages = Math.ceil(total / params.pageSize)

    return {
      items: paginatedUsers,
      total,
      page: params.page,
      pageSize: params.pageSize,
      pages
    }
  } catch (error) {
    console.log('Failed to fetch users:', error)
    throw new Error('Failed to fetch users')
  }
}
