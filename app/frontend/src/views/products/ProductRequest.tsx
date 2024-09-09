import React, { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductRequirementInfoCreate, IProductNameSearch } from '@/types'
import { CreateProductForm, FormSearchProduct } from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'

const Products: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // Start with step 0
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  // const [setData] = useState<IProductInfoSearch[]>([])

  // async function getData(): Promise<IProductInfoSearch[]> {
  //   return [
  //     {
  //       productCode: '123456',
  //       productName: 'Máy in',
  //       modelOrSerialNumber: '123456',
  //       supplier: 'HP',
  //       importDate: new Date().toISOString(), // Save as ISO string
  //       unit: 'Cái',
  //       quantity: 10,
  //       address: 'HCM',
  //       note: 'Ghi chú'
  //     }
  //   ]
  // }

  // const formatDate = (date: string) => {
  //   const d = new Date(date)
  //   const day = String(d.getDate()).padStart(2, '0')
  //   const month = String(d.getMonth() + 1).padStart(2, '0')
  //   const year = d.getFullYear()
  //   const hours = String(d.getHours()).padStart(2, '0')
  //   const minutes = String(d.getMinutes()).padStart(2, '0')

  //   return `${day}/${month}/${year} ${hours}:${minutes}`
  // }

  // useEffect(() => {
  //   getData().then((data) => {
  //     const formattedData = data.map((item) => ({
  //       ...item,
  //       importDate: formatDate(item.importDate)
  //     }))
  //     setData(formattedData)
  //   })
  // }, [])

  const handleFormCreateSubmit = (data: IProductRequirementInfoCreate) => {
    console.log(data)
    setTimeout(() => {
      setShowSearch(true)
      setStep(1)
      setFormSubmitted(true)
    }, 1000)
  }

  const handleFormSearchSubmit = (data: IProductNameSearch) => {
    console.log(data)
    setStep(2)
  }

  return (
    <div className="relative flex items-start flex-1 rounded-lg shadow-none">
      <div className="grid items-start w-full mx-auto gap68">
        <div className="flex justify-center w-full my-2">
          <div className="w-full md:w-1/2">
            <ProgressBar step={step} />
          </div>
        </div>
        <div className="grid w-full">
          {!showSearch ? (
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
    </div>
  )
}

export default Products
