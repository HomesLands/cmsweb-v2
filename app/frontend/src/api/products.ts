import { IPagingResponse, IProductApprovalInfo, IProductInfoSearch } from "@/types"
import productData from '@/data/product.request'
import productList from '@/data/product.list'

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

export async function searchProduct(params: {
  productName: string
}): Promise<IProductInfoSearch[]> {
  const { productName } = params
  const products = productList.items.filter((product) =>
    product.productName.toLowerCase().includes(productName.toLowerCase())
  )
  return products
}