import { IPagingResponse, IRegister } from '@/types'
import http from '@/utils/http'

export async function registerForm(params: {
  fullname: string
  username: string
  password: string
}): Promise<IPagingResponse<IRegister>> {
  console.log('Check register', params)
  try {
    const response = await http.post('/auth/register', params)
  } catch (error) {
    console.log('Failed to register', error)
  }
  return {
    items: [],
    total: 0,
    page: 0,
    pageSize: 0,
    pages: 0
  }
}
