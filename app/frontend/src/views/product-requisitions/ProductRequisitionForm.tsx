import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IFinalProductRequisition, IProductRequisitionFormCreate } from '@/types'
import {
  CreateProductRequisitionForm,
  SearchProductForm,
  ConfirmProductForm
} from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { useMultiStep } from '@/hooks'
import { createProductRequisition } from '@/api/products'
import { showToast } from '@/utils'
import { useRequisitionStore } from '@/stores'
import { ROUTE } from '@/constants'

const ProductRequisitionForm: React.FC = () => {
  const { t } = useTranslation('productRequisition')
  const { t: tToast } = useTranslation('toast')
  const { currentStep, handleStepChange } = useMultiStep(1)
  const { setRequisition, clearRequisition, requisition } = useRequisitionStore()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: IFinalProductRequisition) => {
      return createProductRequisition(data)
    },
    onSuccess: () => {
      showToast(tToast('toast.requestSuccess'))
      clearRequisition()
      handleStepChange(4)
      queryClient.invalidateQueries({
        queryKey: ['notifications']
      })
    }
  })

  const handleFormCreateSubmit = (data: IProductRequisitionFormCreate) => {
    const newRequisition: IProductRequisitionFormCreate = {
      ...data
    }
    // updateRequisition(newRequisition)
    setRequisition(newRequisition)
    handleStepChange(2)
  }

  const handleFormSearchSubmit = () => {
    //check if not add any product to requisition
    if (requisition?.requestProducts.length === 0) {
      showToast(tToast('toast.notAddProductToRequisition'))
      return
    }
    handleStepChange(3)
  }

  const handleConfirmRequest = (data: IFinalProductRequisition) => {
    if (data) {
      mutation.mutate(data)
    }
  }

  const handleBackToCreate = () => {
    handleStepChange(1)
  }

  const handleBackToSearch = () => {
    handleStepChange(2)
  }

  return (
    <div>
      <div className="flex justify-center my-2 w-full">
        <div className="w-full md:w-4/5">
          <ProgressBar step={currentStep} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {currentStep === 1 && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full border-b">
              <div className="flex flex-col gap-2 items-start py-2">
                <CardTitle>{t('productRequisition.createProductRequisitions')}</CardTitle>
                <CardDescription>
                  {t('productRequisition.createProductRequisitionsDescription')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <CreateProductRequisitionForm onSubmit={handleFormCreateSubmit} />
            </CardContent>
          </Card>
        )}
        {currentStep === 2 && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full border-b">
              <div className="flex flex-col gap-2 items-start py-2">
                <CardTitle>{t('productRequisition.addProductToRequest')}</CardTitle>
                <CardDescription>
                  {t('productRequisition.addProductToRequestDescription')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <SearchProductForm onSubmit={handleFormSearchSubmit} onBack={handleBackToCreate} />
            </CardContent>
          </Card>
        )}
        {currentStep === 3 && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full border-b">
              <div className="flex flex-col gap-2 items-start py-2">
                <CardTitle>{t('productRequisition.confirmProductRequisitions')}</CardTitle>
                <CardDescription>
                  {t('productRequisition.confirmProductRequisitionsDescription')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <ConfirmProductForm onConfirm={handleConfirmRequest} onBack={handleBackToSearch} />
            </CardContent>
          </Card>
        )}
        {currentStep === 4 && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full border-b">
              <div className="flex flex-col gap-2 items-start py-2">
                <CardTitle>{t('productRequisition.confirmProductRequisitionsSuccess')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col mt-3 text-normal">
              <p>
                {t('productRequisition.confirmProductRequisitionsSuccessDescription')}{' '}
                <NavLink
                  to={ROUTE.PRODUCT_REQUISITIONS}
                  className="text-blue-500 transition-all duration-300 hover:underline"
                >
                  {t('productRequisition.here')}
                </NavLink>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProductRequisitionForm
