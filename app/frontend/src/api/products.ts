import {
  IApiProductInfoCreate,
  IApiResponse,
  IPaginationResponse,
  IProductInfo,
  IProductInfoCreate,
  IProductInfoUpdate,
  IProductQuery,
  IUnit
} from '@/types'
import { http } from '@/utils'

//Product
export async function getProducts(
  params: IProductQuery
): Promise<IApiResponse<IPaginationResponse<IProductInfo>>> {
  console.log({ params })
  const response = await http.get<IApiResponse<IPaginationResponse<IProductInfo>>>('/products', {
    params
  })
  return response.data
}

export async function getAllProduct(params: {
  order: string
  page: number
  pageSize: number
}): Promise<IApiResponse<IProductInfo>> {
  try {
    const response = await http.get<IApiResponse<IProductInfo>>('/products', {
      params
    })
    return response.data
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function createProduct(data: IApiProductInfoCreate) {
  const response = await http.post<IApiResponse<IProductInfoCreate>>('/products', data)
  return response.data
}

export async function updateProduct(data: IProductInfoUpdate) {
  const response = await http.patch<IApiResponse<IProductInfoCreate>>('/products', data)
  return response.data
}

export async function deleteProduct(slug: string) {
  const response = await http.delete<IApiResponse<IProductInfo>>(`/products/${slug}`)
  return response.data
}

export async function getAllUnit() {
  const response = await http.get<IApiResponse<IUnit[]>>('/units')
  return response.data
}
