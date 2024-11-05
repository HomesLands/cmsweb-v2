import { saveAs } from 'file-saver'
import { AxiosRequestConfig } from 'axios'

import {
  ApprovalLogStatus,
  IAddNewProductInRequisitionUpdate,
  IApiResponse,
  IExportProductRequisitionFormRequest,
  IFinalProductRequisition,
  IPaginationResponse,
  IProductInfo,
  IProductQuery,
  IProductRequisitionFormInfo,
  IRequisitionByUserApproval,
  IRequisitionFormResponseForApprover,
  IResubmitProductRequisition,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { http } from '@/utils'
import { useDownloadStore } from '@/stores'

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
  const response = await http.post<IApiResponse<IProductInfo>>('/productRequisitionForms', data)
  return response.data
}

export async function getProductRequisitionBySlug(slug: string) {
  const response = await http.get<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/${slug}`
  )
  return response.data
}

export async function getRequisitionByUserApproval(userApprovalSlug: string) {
  const response = await http.get<IApiResponse<IRequisitionByUserApproval>>(
    `/userApprovals/${userApprovalSlug}`
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

export async function updateProductRequisitionGeneralInfo(
  data: IUpdateProductRequisitionGeneralInfo
) {
  const response = await http.patch<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/${data.slug}`,
    {
      type: data.type,
      deadlineApproval: data.deadlineApproval,
      projectName: data.projectName,
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

export async function deleteProductRequisitionForm(formSlug: string) {
  const response = await http.delete<IApiResponse<IProductRequisitionFormInfo>>(
    `/productRequisitionForms/${formSlug}`
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
    } as AxiosRequestConfig)

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
    } as AxiosRequestConfig)

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, `${code}.xlsx`)
  } finally {
    setIsDownloading(false)
    reset()
  }
}
