import React from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Card, CardContent, Label } from '@/components/ui'
import { UpdateRequisitionForm } from '@/components/app/form'
import { showToast } from '@/utils'
import { IProductRequisitionFormInfo, IUpdateProductRequisitionQuantity } from '@/types'
import {
  useDeleteProductInRequisition,
  useProductRequisitionBySlug,
  useUpdateProductRequisitionQuantity
} from '@/hooks'

const UpdateProductRequisition: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { t: tToast } = useTranslation('toast')
  const { slug } = useParams()
  const { data, isLoading } = useProductRequisitionBySlug(slug as string)
  const requisition = data?.result as IProductRequisitionFormInfo

  const { mutate: updateProduct } = useUpdateProductRequisitionQuantity(slug as string)
  const { mutate: deleteProduct } = useDeleteProductInRequisition(slug as string)

  const handleConfirmUpdateProduct = (data: IUpdateProductRequisitionQuantity) => {
    if (data) {
      updateProduct(data, {
        onSuccess: () => {
          showToast(tToast('toast.updateRequestSuccess'))
        }
      })
    }
  }

  const handleConfirmDeleteProduct = (requestProductSlug: string) => {
    if (requestProductSlug) {
      deleteProduct(requestProductSlug, {
        onSuccess: () => {
          showToast(tToast('toast.deleteProductSuccess'))
        }
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.updateProductRequisition')}
      </Label>
      <Card>
        <CardContent className="flex flex-col">
          <UpdateRequisitionForm
            onUpdateProductSubmit={handleConfirmUpdateProduct}
            onDeleteProductSubmit={handleConfirmDeleteProduct}
            requisition={requisition}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateProductRequisition
