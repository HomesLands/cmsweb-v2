import React from 'react'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'

import { Button, DataTable } from '@/components/ui'
import {
  IFinalProductRequisition,
  IProductRequisitionFormCreate,
  IProductRequisitionInfo
} from '@/types'
import { useColumnsConfirm } from '@/views/product-requisitions/data-table/columns/columnsConfirm'
import { useRequisitionStore } from '@/stores'

import { baseURL } from '@/constants'

interface IConfirmProductFormProps {
  onConfirm: (data: IFinalProductRequisition) => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({ onConfirm, onBack }) => {
  const { t } = useTranslation('productRequisition')

  const { requisition, getRequisition, updateProductToRequisition, deleteProductToRequisition } =
    useRequisitionStore()

  const handleEditProduct = (product: IProductRequisitionInfo) => {
    updateProductToRequisition(product, product.requestQuantity)
  }

  const handleDeleteProduct = (product: IProductRequisitionInfo) => {
    deleteProductToRequisition(product)
  }

  const columns = useColumnsConfirm(handleEditProduct, handleDeleteProduct)

  const transformRequisitionToApiFormat = (requisition: IProductRequisitionFormCreate) => {
    return {
      code: requisition.code,
      project: requisition.project.slug,
      type: requisition.type,
      deadlineApproval: requisition.deadlineApproval,
      description: requisition.note || '',
      requestProducts: requisition.requestProducts.map((product) => ({
        product: product.product.slug,
        requestQuantity: product.requestQuantity,
        name: product.product.name,
        provider: product.product.provider,
        unit: product.product.unit.slug,
        description: product.product.description
      }))
    }
  }

  const handleConfirm = () => {
    const requisition = getRequisition() as IProductRequisitionFormCreate
    const formattedRequisition = transformRequisitionToApiFormat(requisition)
    onConfirm(formattedRequisition)
  }

  const formatDeadline = (dateString: string | undefined) => {
    if (!dateString) return ''
    try {
      const date = parseISO(dateString)
      return format(date, 'HH:mm dd/MM/yyyy')
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  const getLogoUrl = () => {
    if (getRequisition()?.company.logo) return `${baseURL}/files/${getRequisition()?.company.logo}`
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-4 justify-center">
        <div className="grid grid-cols-8 justify-between items-center py-2 mb-4 border-b-2 sm:grid-cols-6">
          <div className="col-span-1 w-full">
            <img src={getLogoUrl()} className="w-10 sm:w-[4rem]" />
          </div>
          <span className="col-span-4 flex justify-end sm:justify-center sm:col-span-4 text-[0.5rem] font-extrabold text-center uppercase sm:text-2xl text-normal font-beVietNam">
            {t('productRequisition.confirmProductRequisitions')}
          </span>
          <div className="flex col-span-3 justify-end sm:col-span-1">
            <div className="flex flex-col justify-end text-[0.25rem] sm:text-sm font-beVietNam">
              <div className="flex flex-row gap-1 sm:p-1">
                <span>KMH:</span>
                <span>QR3-01/001</span>
              </div>
              <div className="flex flex-row gap-1 sm:p-1">
                <span>Lần ban hành:</span>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>
        {getRequisition() && (
          <div className="grid grid-cols-1 gap-3 mb-4 text-sm sm:grid-cols-3 font-beVietNam">
            <div>
              <strong>Mức ưu tiên: </strong>
              <span className={requisition?.type === 'urgent' ? 'text-red-600 font-bold' : ''}>
                {requisition?.type === 'normal' ? 'Bình thường' : 'Cần gấp'}
              </span>
            </div>
            <div>
              <strong>Thời hạn duyệt: </strong>
              <span>{formatDeadline(requisition?.deadlineApproval)}</span>
            </div>
            <div>
              <strong>Mã phiếu yêu cầu: </strong>
              {getRequisition()?.code}
            </div>
            <div>
              <strong>Người yêu cầu: </strong>
              {requisition?.requester}
            </div>
            <div>
              <strong>Công trình sử dụng: </strong>
              {requisition?.site.name}
            </div>
            <div>
              <strong>Dự án: </strong>
              {requisition?.project.name}
            </div>
            <div>
              <strong>Ghi chú: </strong>
              {requisition?.note}
            </div>
          </div>
        )}
      </div>
      <DataTable
        isLoading={false}
        columns={columns}
        data={getRequisition()?.requestProducts || []}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />

      <div className="flex gap-2 justify-end mt-4 w-full">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleConfirm}>{t('productRequisition.confirm')}</Button>
      </div>
    </div>
  )
}
