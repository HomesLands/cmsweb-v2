import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductRequirementInfoCreate } from '@/types'
import {
  CreateProductRequisitionForm,
  SearchProductForm,
  ConfirmProductForm
} from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { useMultiStep } from '@/hooks'
import { postProductRequest } from '@/api/products'
import { showToast } from '@/utils'
import { useRequisitionStore } from '@/stores'

const ProductRequisitionForm: React.FC = () => {
  const { t } = useTranslation('productRequisition')
  const { currentStep, handleStepChange } = useMultiStep(1)
  const [formData, setFormData] = useState<IProductRequirementInfoCreate | null>(null)
  const { setRequisition, getRequisition } = useRequisitionStore()

  // useEffect(() => {
  //   const savedFormData = getRequisition()
  //   if (savedFormData) {
  //     setFormData(savedFormData)
  //   }
  // }, [getRequisition])

  const mutation = useMutation({
    mutationFn: async (data: IProductRequirementInfoCreate) => {
      return postProductRequest(data)
    },
    onSuccess: () => {
      showToast(t('request_success'))
      // handleStepChange(4)
    }
  })

  const handleFormCreateSubmit = (data: IProductRequirementInfoCreate) => {
    const newRequisition: IProductRequirementInfoCreate = {
      ...data,
      createdAt: new Date().toISOString()
    }
    setRequisition(newRequisition)
    handleStepChange(2)
  }

  const handleFormSearchSubmit = () => {
    handleStepChange(3)
  }

  const handleConfirmRequest = () => {
    const savedFormData = getRequisition()
    if (savedFormData) {
      mutation.mutate(savedFormData)

      // handleStepChange(4)
    }
  }

  const handleBackToCreate = () => {
    const savedFormData = getRequisition()
    if (savedFormData) {
      setFormData(savedFormData)
    }
    handleStepChange(1)
  }

  const handleBackToSearch = () => {
    handleStepChange(2)
  }

  return (
    <div>
      <div className="flex justify-center w-full my-2">
        <div className="w-full md:w-4/5">
          <ProgressBar step={currentStep} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {currentStep === 1 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>{t('productRequisition.createProductRequisitions')}</CardTitle>
                <CardDescription>
                  {t('productRequisition.createProductRequisitionsDescription')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <CreateProductRequisitionForm
                onSubmit={handleFormCreateSubmit}
                initialData={formData}
              />
            </CardContent>
          </Card>
        )}
        {currentStep === 2 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
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
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
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
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>{t('productRequisition.confirmProductRequisitionsSuccess')}</CardTitle>
                <CardDescription>
                  {t('productRequisition.confirmProductRequisitionsSuccessDescription')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p>{t('productRequisition.confirmProductRequisitionsSuccessDescription')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProductRequisitionForm
