import { IPagingResponse, IProductApprovalInfo } from "@/types"
import productData from '@/data/product.request'

export async function getProducts(params: {
  page: number
  pageSize: number
}): Promise<IPagingResponse<IProductApprovalInfo>> {
  try {
    const products: IProductApprovalInfo[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(productData.items)
      }, 1000)
    })

    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize

    const paginatedProducts = products.slice(startIndex, endIndex)

    const total = products.length
    const pages = Math.ceil(total / params.pageSize)

    return {
      items: paginatedProducts,
      total,
      page: params.page,
      pageSize: params.pageSize,
      pages
    }
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}