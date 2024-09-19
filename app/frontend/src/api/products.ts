import {
  IConstruction,
  IConstructionListResponse,
  IPaginationResponse,
  IProductApprovalInfo,
  IProductInfo,
  IProductRequirementInfoCreate,
  IProject,
  IProjectListResponse
} from '@/types'
import productData from '@/data/products'
// import productListData from '@/data/product.list'
import { http } from '@/utils'

export async function getProducts(params: {
  page: number
  pageSize: number
}): Promise<IPaginationResponse<IProductApprovalInfo>> {
  try {
    const users: IProductApprovalInfo[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(productData.items)
      }, 1000)
    })

    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize

    const paginatedProducts = users.slice(startIndex, endIndex)

    const total = users.length
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

// export async function getProductList(params: {
//   page: number
//   pageSize: number
// }): Promise<IPaginationResponse<IProductInfo>> {
//   try {
//     const productList: IProductInfo[] = await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(productListData.items)
//       }, 1000)
//     })

//     const startIndex = (params.page - 1) * params.pageSize
//     const endIndex = startIndex + params.pageSize

//     const paginatedProductList = productList.slice(startIndex, endIndex)

//     const total = productList.length
//     const pages = Math.ceil(total / params.pageSize)

//     return {
//       items: paginatedProductList,
//       total,
//       page: params.page,
//       pageSize: params.pageSize,
//       pages
//     }
//   } catch (error) {
//     console.log('Failed to fetch products:', error)
//     throw new Error('Failed to fetch products')
//   }
// }

export async function postProductRequest(params: {
  requestCode: string
  requester: string
  project: {
    slug: string
    name: string
  }
  site: {
    slug: string
    name: string
  }
  approver: string
  note: string
  priority: string
  products: IProductInfo[]
  createdAt: string
}): Promise<IProductRequirementInfoCreate> {
  // Convert parameters to lowercase directly
  const lowercaseParams = {
    requestCode: params.requestCode,
    requester: params.requester.toLowerCase(),
    project: {
      slug: params.project.slug,
      name: params.project.name.toLowerCase()
    },
    site: {
      slug: params.site.slug,
      name: params.site.name.toLowerCase()
    },
    approver: params.approver.toLowerCase(),
    note: params.note.toLowerCase(),
    priority: params.priority.toLowerCase(),
    products: params.products,
    createdAt: params.createdAt
  }
  return lowercaseParams
}

export async function getProjectListInProductRequisition(): Promise<
  IProjectListResponse<IProject[]>
> {
  try {
    const response = await http.get<IProjectListResponse<IProject[]>>('/projects')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch projects')
  }
}

export async function getConstructionListInProductRequisition(): Promise<
  IConstructionListResponse<IConstruction[]>
> {
  try {
    const response = await http.get<IProjectListResponse<IConstruction[]>>('/sites')
    return response.data
  } catch (error) {
    console.log('Failed to fetch constructions:', error)
    throw new Error('Failed to fetch constructions')
  }
}

export async function getAllProduct(params: {
  page: number
  pageSize: number
}): Promise<IPaginationResponse<IProductInfo>> {
  try {
    const response = await http.get<IPaginationResponse<IProductInfo>>('/products', {
      params
    })
    return response.data
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

// export async function searchProduct(params: {
//   productName: string
// }): Promise<IProductInfoSearch[]> {
//   const { productName } = params
//   const products = productList.items.filter((product) =>
//     product.productName.toLowerCase().includes(productName.toLowerCase())
//   )
//   return products
// }

// export async function searchProduct(params: {
//   productName: string
// }): Promise<IProductInfoSearch[]> {
//   const { productName } = params
//   const products = productList.items.filter((product) =>
//     product.productName.toLowerCase().includes(productName.toLowerCase())
//   )
//   return products
// }
