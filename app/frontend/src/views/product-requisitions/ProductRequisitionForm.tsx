import React, { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductRequirementInfoCreate, IProductNameSearch, IProductInfo } from '@/types'
import {
  CreateProductRequisitionForm,
  SearchProductForm,
  ConfirmProductForm
} from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { useMultiStep, useUsers2 } from '@/hooks'
import { postProductRequest } from '@/api/products'
import { showToast } from '@/utils'

const ProductRequisitionForm: React.FC = () => {
  const { t } = useTranslation('productRequisition')

  const { currentStep, handleStepChange } = useMultiStep(1)
  const [formData, setFormData] = useState<IProductRequirementInfoCreate | null>(null)
  const [searchData, setSearchData] = useState<IProductNameSearch | null>(null)

  const { data: users } = useUsers2()

  useEffect(() => {
    const savedFormData = localStorage.getItem('requestFormProducts')
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
    const savedSearchData = localStorage.getItem('searchData')
    if (savedSearchData) {
      setSearchData(JSON.parse(savedSearchData))
    }
  }, [])

  const mutation = useMutation({
    mutationFn: async (data: IProductRequirementInfoCreate) => {
      return postProductRequest(data)
    },
    onSuccess: () => {
      showToast(t('request_success'))
      // handleStepChange(4)
    }
  })

  const handleFormCreateSubmit = (data: {
    requestCode: string
    requester: string
    project: {
      id: string
      name: string
    }
    site: {
      id: string
      name: string
    }
    approver: string
    note: string
    priority: string
    products: IProductInfo[]
    createdAt: string
  }) => {
    setFormData(data)
    localStorage.setItem('requestFormProducts', JSON.stringify(data))
    handleStepChange(2)
  }

  const handleFormSearchSubmit = (data: IProductNameSearch) => {
    setSearchData(data)
    localStorage.setItem('searchData', JSON.stringify(data))
    handleStepChange(3)
  }

  const handleConfirmRequest = () => {
    const savedFormData = localStorage.getItem('requestFormProducts')
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData)
      mutation.mutate(parsedFormData)

      // handleStepChange(4)
    }
  }

  const handleBackToCreate = () => {
    const savedFormData = localStorage.getItem('requestFormProducts')
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData)
      setFormData(parsedFormData)
    }
    handleStepChange(1)
  }

  const handleBackToSearch = () => {
    const savedSearchData = localStorage.getItem('searchData')
    if (savedSearchData) {
      setSearchData(JSON.parse(savedSearchData))
    }
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
              <SearchProductForm
                onSubmit={handleFormSearchSubmit}
                onBack={handleBackToCreate}
                initialData={searchData}
              />
            </CardContent>
          </Card>
        )}
        {currentStep === 3 && formData && (
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
              <ConfirmProductForm
                data={formData}
                onConfirm={handleConfirmRequest}
                onBack={handleBackToSearch}
              />
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
