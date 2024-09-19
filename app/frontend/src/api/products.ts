import {
  IApiResponse,
  IPaginationResponse,
  IProductInfo,
  IProductQuery,
  IProductRequirementInfoCreate
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
