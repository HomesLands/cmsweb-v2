import React from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Card, CardContent, Label } from '@/components/ui'
import { UpdateRequisitionForm } from '@/components/app/form'
import { showToast } from '@/utils'
import {
  IProductRequisitionFormInfo,
  IResubmitProductRequisition,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import {
  // useAddNewProductInRequisitionUpdate,
  useDeleteProductInRequisition,
  useProductRequisitionBySlug,
  useResubmitProductRequisition,
  useUpdateProductRequisitionGeneralInfo,
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
  // const { mutate: addNewProduct } = useAddNewProductInRequisitionUpdate(slug as string)
  const { mutate: updateGeneralInfo } = useUpdateProductRequisitionGeneralInfo()
  const { mutate: resubmit } = useResubmitProductRequisition(slug as string)

  const handleUpdateGeneralInfo = (data: IUpdateProductRequisitionGeneralInfo) => {
    if (data) {
      updateGeneralInfo(data, {
        onSuccess: () => {
          showToast(tToast('toast.updateRequestSuccess'))
        }
      })
    }
  }

  const handleConfirmUpdateProduct = (data: IUpdateProductRequisitionQuantity) => {
    console.log('data', data)
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

  const handleResubmit = (data: IResubmitProductRequisition) => {
    if (data) {
      resubmit(data, {
        onSuccess: () => {
          showToast(tToast('toast.resubmitSuccess'))
        }
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.updateProductRequisition')}
      </Label>
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-col">
          <UpdateRequisitionForm
            onResubmit={handleResubmit}
            onUpdateProductSubmit={handleConfirmUpdateProduct}
            onUpdateGeneralInfo={handleUpdateGeneralInfo}
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
