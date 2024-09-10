import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductRequirementInfoCreate, IProductNameSearch } from '@/types'
import { CreateProductForm, FormSearchProduct } from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { productRequest } from '@/api/products'

const ProductRequest: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0)
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: async (data: IProductRequirementInfoCreate) => {
      return productRequest(data)
    }
  })

  // const mutationSearch = useMutation({
  //   mutationFn: async (data: IProductNameSearch) => {
  //     return searchProduct(data)
  //   }
  // })

  const handleFormCreateSubmit = (data: IProductRequirementInfoCreate) => {
    console.log('Submitted Data:', data)
    mutation.mutate(data)
    setShowSearch(true)
    setStep(1)
    setFormSubmitted(true)
  }

  const handleFormSearchSubmit = (data: IProductNameSearch) => {
    console.log(data)
    // mutationSearch.mutate(data)
    setStep(2)
  }

  // const handleFormCreateSubmit = (data: IProductRequirementInfoCreate) => {
  //   console.log(data)
  //   setTimeout(() => {
  //     setShowSearch(true)
  //     setStep(1)
  //     setFormSubmitted(true)
  //   }, 1000)
  // }

  // const handleFormSearchSubmit = (data: IProductNameSearch) => {
  //   console.log(data)
  //   setStep(2)
  // }

  return (
    <div>
      <div className="flex justify-center w-full my-2">
        <div className="w-full md:w-1/2">
          <ProgressBar step={step} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {showSearch ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Yêu cầu vật tư</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              {!formSubmitted && !showSearch && (
                <CreateProductForm onSubmit={handleFormCreateSubmit} />
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Thêm vật tư vào yêu cầu</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <FormSearchProduct onSubmit={handleFormSearchSubmit} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProductRequest
