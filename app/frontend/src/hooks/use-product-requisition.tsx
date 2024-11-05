import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import {
  addNewProductInRequisitionUpdate,
  approveProductRequisition,
  createProductRequisition,
  deleteProductRequisition,
  deleteProductRequisitionForm,
  exportExcelProductRequisition,
  exportPDFProductRequisition,
  getAllProductRequisition,
  getApprovedProductRequisition,
  getProductRequisitionByApprover,
  getProductRequisitionByCreator,
  getProductRequisitionBySlug,
  getRequisitionByUserApproval,
  resubmitProductRequisition,
  updateProductRequisitionGeneralInfo,
  updateProductRequisitionQuantity
} from '@/api'
import {
  IAddNewProductInRequisitionUpdate,
  IApproveProductRequisition,
  IExportProductRequisitionFormRequest,
  IFinalProductRequisition,
  IProductQuery,
  IResubmitProductRequisition,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import { showToast } from '@/utils'

export const useAllProductRequisition = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['allProductRequisition'],
    queryFn: () => getAllProductRequisition(q)
  })
}

export const useProductRequisitionBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['productRequisitionBySlug', slug],
    queryFn: () => getProductRequisitionBySlug(slug)
  })
}

//Get all product requisition for approver
export const useProductRequisitionByApprover = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['productRequisitionByApprover', JSON.stringify(q)],
    queryFn: () => getProductRequisitionByApprover(q)
  })
}

//Get product requisition by slug for approver
export const useRequisitionByUserApproval = (slug: string) => {
  return useQuery({
    queryKey: ['requisitionByUserApproval', slug],
    queryFn: () => getRequisitionByUserApproval(slug)
  })
}

export const useProductRequisitionByCreator = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['productRequisitionByCreator', JSON.stringify(q)],
    queryFn: () => getProductRequisitionByCreator(q)
  })
}

export const useUpdateProductRequisitionQuantity = (slug: string) => {
  const queryClient = useQueryClient()
  const { t: tToast } = useTranslation('toast')

  return useMutation({
    mutationFn: (data: IUpdateProductRequisitionQuantity) => updateProductRequisitionQuantity(data),
    onSuccess: () => {
      showToast(tToast('toast.updateProductSuccess'))
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useDeleteProductInRequisition = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestProductSlug: string) => deleteProductRequisition(requestProductSlug),
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useAddNewProductInRequisitionUpdate = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IAddNewProductInRequisitionUpdate) => addNewProductInRequisitionUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useUpdateProductRequisitionGeneralInfo = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUpdateProductRequisitionGeneralInfo) =>
      updateProductRequisitionGeneralInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
    }
  })
}

export const useResubmitProductRequisition = (slug: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IResubmitProductRequisition) => resubmitProductRequisition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productRequisitionBySlug', slug] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
}

export const useApproveProductRequisition = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IApproveProductRequisition) =>
      approveProductRequisition(data.formSlug, data.approvalLog),
    onSuccess: (data, variables) => {
      // Invalidate the specific requisition query
      // queryClient.invalidateQueries({
      //   queryKey: ['requisitionByUserApproval']
      // })
      return data
    }
  })
}

export const useCreateProductRequisition = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IFinalProductRequisition) => createProductRequisition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProductRequisition'] })
    }
  })
}

export const useDeleteProductRequisition = () => {
  return useMutation({
    mutationFn: (formSlug: string) => deleteProductRequisitionForm(formSlug)
  })
}

export const useGetApprovedProductRequisition = (q: IProductQuery) => {
  return useQuery({
    queryKey: ['approvedProductRequisition', JSON.stringify(q)],
    queryFn: () => getApprovedProductRequisition(q)
  })
}

export const useExportPDFProductRequisition = () => {
  return useMutation({
    mutationFn: (requestData: IExportProductRequisitionFormRequest) =>
      exportPDFProductRequisition(requestData)
  })
}

export const useExportExcelProductRequisition = () => {
  return useMutation({
    mutationFn: (requestData: IExportProductRequisitionFormRequest) =>
      exportExcelProductRequisition(requestData)
  })
}
