import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { Button, DataTableRequisition } from '@/components/ui'
import { IProductRequirementInfoCreate, IRequestProduct } from '@/types'
import { TbeLogo } from '@/assets/images'
import { useColumnsConfirm } from '@/views/product-requisitions/DataTable/columnsConfirm'
import { useRequisitionStore } from '@/stores'

interface IConfirmProductFormProps {
  onConfirm: (data: IProductRequirementInfoCreate) => void
  onBack: () => void
}

export const ConfirmProductForm: React.FC<IConfirmProductFormProps> = ({ onConfirm, onBack }) => {
  const [localData, setLocalData] = useState<IProductRequirementInfoCreate | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<IRequestProduct[]>([])
  const { t } = useTranslation('productRequisition')

  const { requisition, updateProductToRequisition, deleteProductToRequisition } =
    useRequisitionStore()

  const handleEditRequest = (product: IRequestProduct) => {
    updateProductToRequisition(product)
  }

  const handleDeleteProduct = (product: IRequestProduct) => {
    deleteProductToRequisition(product)
  }

  useEffect(() => {
    if (localData) {
      setSelectedProducts(localData.products)
    }
  }, [localData])

  const columns = useColumnsConfirm(handleEditRequest, handleDeleteProduct)

  const handleConfirm = () => {
    if (localData) {
      onConfirm(localData)
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-row items-center justify-between py-3 border-b-2">
          <img src={TbeLogo} height={56} width={56} />
          <span className="text-xl font-bold text-normal font-beVietNam">
            {t('productRequisition.confirmProductRequisitions')}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row p-2 border rounded-md">
              <span>KMH</span>
              <span>QR3-01/001</span>
            </div>
            <div className="flex flex-row p-2 border rounded-md">
              <span>Lần ban hành</span>
              <span>1</span>
            </div>
          </div>
        </div>
        {requisition && (
          <div className="grid grid-cols-3 gap-3 mb-3 text-sm font-beVietNam">
            <div>
              <strong>Ngày yêu cầu: </strong>
              {format(new Date(requisition?.createdAt || ''), 'hh:mm:ss dd/MM/yyyy')}
            </div>
            <div>
              <strong>Người yêu cầu: </strong>
              {requisition?.requester}
            </div>
            <div>
              <strong>Mã hóa đơn: </strong>
              {requisition?.requestCode}
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
      <DataTableRequisition
        isLoading={false}
        columns={columns}
        data={requisition?.products || []}
        pages={1}
        page={1}
        pageSize={requisition?.products?.length || 0}
        onPageChange={() => {}}
      />

      <div className="flex justify-end w-full gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>
          {t('productRequisition.back')}
        </Button>
        <Button onClick={handleConfirm}>{t('productRequisition.confirm')}</Button>
      </div>
    </div>
  )
}
