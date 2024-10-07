import {
  ApprovalLogStatus,
  IAddNewProductInRequisitionUpdate,
  IApiResponse,
  IFinalProductRequisition,
  IPaginationResponse,
  IProductInfo,
  IProductQuery,
  IProductRequisitionFormInfo,
  IRequisitionFormResponseForApprover,
  IResubmitProductRequisition,
  IUnit,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { http } from '@/utils'

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

export async function getAllProductRequisition(params: IProductQuery) {
  const response = await http.get<IApiResponse<IPaginationResponse<IProductRequisitionFormInfo>>>(
    '/productRequisitionForms',
    {
      params
    }
  )
  return response.data
}

export async function getProductRequisitionByApprover(params: IProductQuery) {
  const response = await http.get<
    IApiResponse<IPaginationResponse<IRequisitionFormResponseForApprover>>
  >('/userApprovals', {
    params
  })
  return response.data
}

export async function createProductRequisition(data: IFinalProductRequisition) {
  console.log('product requisition', data)
  const response = await http.post<IApiResponse<IProductInfo>>('/productRequisitionForms', data)
  return response.data
}

export async function getProductRequisitionBySlug(slug: string) {
  const response = await http.get<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/${slug}`
  )
  return response.data
}

export async function getProductRequisitionByCreator(params: IProductQuery) {
  const response = await http.get<IApiResponse<IPaginationResponse<IProductRequisitionFormInfo>>>(
    '/productRequisitionForms',
    {
      params
    }
  )
  return response.data
}

export async function approveProductRequisition(
  formSlug: string,
  approvalLog: {
    status: ApprovalLogStatus
    content: string
  }
) {
  const response = await http.patch<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/approval`,
    {
      formSlug,
      approvalLog
    }
  )
  return response.data
}

export async function updateProductRequisitionQuantity(params: IUpdateProductRequisitionQuantity) {
  const response = await http.patch<IApiResponse<IProductRequisitionFormInfo>>(
    `/requestProducts/${params.slug}`,
    params
  )
  return response.data
}

//Delete product in requisition
export async function deleteProductRequisition(requestProductSlug: string) {
  const response = await http.delete<IApiResponse<IProductRequisitionFormInfo>>(
    `/requestProducts/${requestProductSlug}`,
    {
      params: { requestProductSlug }
    }
  )
  return response.data
}

export async function addNewProductInRequisitionUpdate(data: IAddNewProductInRequisitionUpdate) {
  const response = await http.post<IApiResponse<IProductRequisitionFormInfo>>(
    `/requestProducts`,
    data
  )
  return response.data
}

export async function getAllUnit() {
  const response = await http.get<IApiResponse<IUnit[]>>('/units')
  return response.data
}

export async function updateProductRequisitionGeneralInfo(
  data: IUpdateProductRequisitionGeneralInfo
) {
  const response = await http.patch<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/${data.slug}`,
    {
      type: data.type,
      deadlineApproval: data.deadlineApproval,
      project: data.project.slug,
      description: data.description
    }
  )
  return response.data
}

export async function resubmitProductRequisition(data: IResubmitProductRequisition) {
  const response = await http.patch<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/resubmit`,
    data
  )
  return response.data
}
