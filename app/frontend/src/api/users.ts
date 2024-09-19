import { IPaginationResponse, IUserBySlug, IUserInfo } from '@/types'
import http from '@/utils/http'
import userData from '@/data/users'

export async function getUsers(params: {
  page: number
  pageSize: number
}): Promise<IPaginationResponse<IUserInfo>> {
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
      page: params.page,
      pageSize: params.pageSize,
      pages
    }
  } catch (error) {
    console.log('Failed to fetch users:', error)
    throw new Error('Failed to fetch users')
  }
}

// export async function getUsers2() {
//   const response = await http.get<IUserInfo>('/users')
//   return response.data
// }

export async function getBySlug(slug: string) {
  // const response = await http.get<IUserInfo>(`/users/${slug}`)
  const response = await http.get<IUserBySlug>(`/users/${slug}`)
  return response.data
}
