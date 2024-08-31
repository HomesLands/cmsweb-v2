import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTableSearchProduct
} from '@/components/ui'
import { SpinnerLoading } from '@/components/app/loading'
import { IProductRequirementInfoCreate, IProductNameSearch, IProductInfoSearch } from '@/types'
import { CreateProductForm, FormSearchProduct } from '@/components/app/form'
import { ProgressBar } from '@/components/app/progress/progress-bar'
import { columnsSearch } from './DataTable/columns'

const Products: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // Start with step 0
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [data, setData] = useState<IProductInfoSearch[]>([])

  async function getData(): Promise<IProductInfoSearch[]> {
    return [
      {
        productCode: '123456',
        productName: 'Máy in',
        modelOrSerialNumber: '123456',
        supplier: 'HP',
        importDate: new Date(),
        unit: 'Cái',
        quantity: 10,
        address: 'HCM',
        note: 'Ghi chú'
      }
    ]
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  useEffect(() => {
    getData().then((data) => {
      const formattedData = data.map((item) => ({
        ...item,
        importDate: formatDate(item.importDate)
      }))
      setData(formattedData)
      setLoading(false)
    })
  }, [])

  const handleFormCreateSubmit = (data: IProductRequirementInfoCreate) => {
    setLoading(true)
    console.log(data)
    setTimeout(() => {
      setLoading(false)
      setShowSearch(true)
      setStep(1) // Move to step 1 after the first form submission
      setFormSubmitted(true)
    }, 1000)
  }

  const handleFormSearchSubmit = (data: IProductNameSearch) => {
    console.log(data)
    setStep(2) // Move to step 2 after search
  }

  return (
    <div className="relative flex items-start flex-1 rounded-lg shadow-none">
      <div className="grid items-start w-full gap-8 mx-auto">
        <div className="flex justify-center w-full my-2">
          <div className="w-1/2">
            <ProgressBar step={step} /> {/* Pass step to ProgressBar */}
          </div>
        </div>
        <div className="grid w-full gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2">
                <CardTitle>Yêu cầu vật tư</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              {!formSubmitted && !showSearch && (
                <CreateProductForm onSubmit={handleFormCreateSubmit} />
              )}
              {loading && <SpinnerLoading />}
              {showSearch && (
                <div>
                  <FormSearchProduct onSubmit={handleFormSearchSubmit} />
                  <DataTableSearchProduct columns={columnsSearch} data={data} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Products
