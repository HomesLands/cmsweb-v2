import { useState } from 'react'
import { AxiosError, isAxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IApiResponse, IRequisitionByUserApproval } from '@/types'

import { useDeleteProductRequisition } from '@/hooks'
import { showErrorToast, showToast } from '@/utils'

import { ROUTE } from '@/constants'

export default function DialogDeleteProductRequisition({
  requisition // IRequisitionByUserApproval
}: {
  requisition: IRequisitionByUserApproval | null
}) {
  const { t } = useTranslation('productRequisition')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteProductRequisition } = useDeleteProductRequisition()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (formSlug: string) => {
    deleteProductRequisition(formSlug, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteProductRequisitionSuccess'))
        navigate(ROUTE.APPROVAL_PRODUCT_REQUISITIONS, { replace: true })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<IApiResponse<void>>
          if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="destructive" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('productRequisition.deleteProductRequisition')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('productRequisition.deleteProductRequisition')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('productRequisition.deleteProductRequisitionDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('productRequisition.deleteProductRequisitionConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('productRequisition.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              requisition && handleSubmit(requisition.productRequisitionForm.slug || '')
            }
          >
            {t('productRequisition.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
