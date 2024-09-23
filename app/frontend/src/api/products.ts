import {
  IApiResponse,
  IFinalProductRequisition,
  IPaginationResponse,
  IProductInfo,
  IProductQuery,
  IProductRequirementInfoCreate,
  IRequestRequisitionInfo
} from '@/types'
import { http } from '@/utils'

export async function getProducts(
  params: IProductQuery
): Promise<IApiResponse<IPaginationResponse<IProductInfo>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IProductInfo>>>('/products', {
    params
  })
  return response.data
}

// export async function postProductRequest(params: {
//   requestCode: string
//   requester: string
//   project: {
//     slug: string
//     name: string
//   }
//   site: {
//     slug: string
//     name: string
//   }
//   approver: string
//   note: string
//   priority: string
//   products: IProductInfo[]
//   createdAt: string
// }): Promise<IProductRequirementInfoCreate> {
//   const lowercaseParams = {
//     requestCode: params.requestCode,
//     requester: params.requester.toLowerCase(),
//     project: {
//       slug: params.project.slug,
//       name: params.project.name.toLowerCase()
//     },
//     site: {
//       slug: params.site.slug,
//       name: params.site.name.toLowerCase()
//     },
//     approver: params.approver.toLowerCase(),
//     note: params.note.toLowerCase(),
//     priority: params.priority.toLowerCase(),
//     products: params.products,
//     createdAt: params.createdAt
//   }
//   return lowercaseParams
// }

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

export async function getAllProductRequisition(params: IProductQuery) {
  const response = await http.get<IApiResponse<IPaginationResponse<IRequestRequisitionInfo>>>(
    '/productRequisitionForms',
    {
      params
    }
  )
  return response.data
}

export async function createProductRequisition(data: IFinalProductRequisition) {
  console.log('product requisition', data)
  const response = await http.post<IApiResponse<IProductInfo>>('/productRequisitionForms', data)
  return response.data
}

export async function getProductRequisitionBySlug(slug: string) {
  const response = await http.get<IApiResponse<IProductInfo>>(`/productRequisitionForms/${slug}`)
  return response
}
