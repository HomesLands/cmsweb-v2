import React from 'react'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Card, CardContent, Label } from '@/components/ui'
import { UpdateRequisitionForm } from '@/components/app/form'
import { showErrorToast, showToast } from '@/utils'
import {
  IApiResponse,
  IProductRequisitionFormInfo,
  IResubmitProductRequisition,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity
} from '@/types'
import {
  useDeleteProductInRequisition,
  useProductRequisitionBySlug,
  useResubmitProductRequisition,
  useUpdateProductRequisitionGeneralInfo,
  useUpdateProductRequisitionQuantity
} from '@/hooks'
import { isAxiosError } from 'axios'
import { AxiosError } from 'axios'

const UpdateProductRequisition: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { t: tToast } = useTranslation('toast')
  const { slug } = useParams()
  const { data, isLoading } = useProductRequisitionBySlug(slug as string)
  const requisition = data?.result as IProductRequisitionFormInfo

  const { mutate: updateProduct } = useUpdateProductRequisitionQuantity(slug as string)
  const { mutate: deleteProduct } = useDeleteProductInRequisition(slug as string)
  const { mutate: updateGeneralInfo } = useUpdateProductRequisitionGeneralInfo(slug as string)
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
    if (data) {
      updateProduct(data, {
        onSuccess: () => {
          showToast(tToast('toast.updateRequestSuccess'))
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            const axiosError = error as AxiosError<IApiResponse<void>>
            if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
          }
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
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
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
