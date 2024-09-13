import React, { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postProductRequest } from '@/api/products'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductRequirementInfoCreate, IProductNameSearch, IProductInfo } from '@/types'
import { CreateProductForm, SearchProductForm, ConfirmProductForm } from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { useMultiStep } from '@/hooks'
import toast from 'react-hot-toast'

const ProductRequest: React.FC = () => {
  const { currentStep, handleStepChange } = useMultiStep(1)
  const [formData, setFormData] = useState<IProductRequirementInfoCreate | null>(null)
  const [searchData, setSearchData] = useState<IProductNameSearch | null>(null)

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
    }
  })

  const handleFormCreateSubmit = (data: {
    requestCode: string
    requester: string
    project: string
    construction: string
    approver: string
    note: string
    priority: string
    products: IProductInfo[]
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
      const productData = JSON.parse(savedFormData)
      mutation.mutate(productData)
      toast.success('Yêu cầu đã được gửi thành công')

      // handleStepChange(4)
    }
  }

  const handleBackToCreate = (step: number) => {
    const savedFormData = localStorage.getItem('requestFormProducts')
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
    handleStepChange(step)
  }

  const handleBackToSearch = (step: number) => {
    const savedSearchData = localStorage.getItem('searchData')
    if (savedSearchData) {
      setSearchData(JSON.parse(savedSearchData))
    }
    handleStepChange(step)
  }

  return (
    <div>
      <div className="flex justify-center w-full my-2">
        <div className="w-full md:w-1/2">
          <ProgressBar step={currentStep} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {currentStep === 1 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Yêu cầu vật tư</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <CreateProductForm onSubmit={handleFormCreateSubmit} initialData={formData} />
            </CardContent>
          </Card>
        )}
        {currentStep === 2 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Thêm vật tư vào yêu cầu</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
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
                <CardTitle>Xác nhận yêu cầu vật tư</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
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
                <CardTitle>Yêu cầu đã được gửi</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p>Yêu cầu của bạn đã được gửi thành công.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProductRequest
