import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductInfo } from '@/types'
import { AddNewProductForm } from '@/components/app/form'

const AddNewProduct: React.FC = () => {
  // const [ setFormSubmitted] = useState<boolean>(false)

  const handleFormCreateSubmit = (formData: IProductInfo) => {
    setTimeout(() => {
      // setShowSearch(true)
      // setStep(1)
      // setFormSubmitted(true)
    }, 1000)
  }

  // Existing code for fetching and formatting data...

  return (
    <div className="relative flex items-start flex-1 rounded-lg shadow-none">
      <div className="grid items-start w-full mx-auto gap68">
        <div className="grid w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between w-full border-b">
              <div className="flex flex-col items-start gap-2 py-2">
                <CardTitle>Yêu cầu vật tư</CardTitle>
                <CardDescription>Công ty Cổ phần Công nghệ Mekong</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <AddNewProductForm onSubmit={handleFormCreateSubmit} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddNewProduct
