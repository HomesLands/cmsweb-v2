import {
  ApprovalLogStatus,
  IAddNewProductInRequisitionUpdate,
  IApiProductInfoCreate,
  IApiResponse,
  IExportProductRequisitionFormRequest,
  IFinalProductRequisition,
  IPaginationResponse,
  IProductInfo,
  IProductInfoCreate,
  IProductInfoUpdate,
  IProductQuery,
  IProductRequisitionFormInfo,
  IRequisitionFormResponseForApprover,
  IResubmitProductRequisition,
  IUnit,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { http } from '@/utils'
import { saveAs } from 'file-saver'
import { create } from 'zustand'
import { AxiosRequestConfig } from 'axios'

interface DownloadState {
  progress: number
  fileName: string
  isDownloading: boolean
  setProgress: (progress: number) => void
  setFileName: (fileName: string) => void
  setIsDownloading: (isDownloading: boolean) => void
  reset: () => void
}

export const useDownloadStore = create<DownloadState>((set) => ({
  progress: 0,
  fileName: '',
  isDownloading: false,
  setProgress: (progress) => set({ progress }),
  setFileName: (fileName) => set({ fileName }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  reset: () => set({ progress: 0, fileName: '', isDownloading: false })
}))

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

//Product requisition

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
  console.log('params', params)
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

export async function getApprovedProductRequisition(params: IProductQuery) {
  const response = await http.get<IApiResponse<IPaginationResponse<IProductRequisitionFormInfo>>>(
    '/productRequisitionForms/completedApproval',
    {
      params
    }
  )
  return response.data
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  doNotShowLoading?: boolean
}

export async function exportPDFProductRequisition({
  slug,
  code
}: IExportProductRequisitionFormRequest) {
  const { setProgress, setFileName, setIsDownloading, reset } = useDownloadStore.getState()
  setFileName(`${code}.pdf`)
  setIsDownloading(true)

  try {
    const response = await http.get(`/productRequisitionForms/${slug}/exportPdf`, {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf'
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        )
        setProgress(percentCompleted)
      },
      doNotShowLoading: true
    } as CustomAxiosRequestConfig)

    const blob = new Blob([response.data], { type: 'application/pdf' })
    saveAs(blob, `${code}.pdf`)
    return response.data
  } finally {
    setIsDownloading(false)
    reset()
  }
}

export async function exportExcelProductRequisition({
  slug,
  code
}: IExportProductRequisitionFormRequest) {
  const { setProgress, setFileName, setIsDownloading, reset } = useDownloadStore.getState()
  setFileName(`${code}.xlsx`)
  setIsDownloading(true)

  try {
    const response = await http.get(`/productRequisitionForms/${slug}/exportExcel`, {
      responseType: 'blob',
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        )
        setProgress(percentCompleted)
      },
      doNotShowLoading: true
    } as CustomAxiosRequestConfig)

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, `${code}.xlsx`)
  } finally {
    setIsDownloading(false)
    reset()
  }
}
