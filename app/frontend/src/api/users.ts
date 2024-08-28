import { PagingResponse, userInfo } from "@/types/user.type";

import userData from "./users.json";

export async function getUsers(params: {
    page: number;
    pageSize: number;
}): Promise<PagingResponse<userInfo>> {
    try {
        const users: userInfo[] = await new Promise((resolve) => {
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
            page_size: params.pageSize,
            pages
        }
    } catch (error) {
        console.log('Failed to fetch users:', error)
        throw new Error('Failed to fetch users')
    }
}