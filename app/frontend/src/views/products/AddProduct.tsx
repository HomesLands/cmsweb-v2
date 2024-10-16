import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { IProductInfoCreate, IApiProductInfoCreate } from '@/types'
import { AddNewProductForm } from '@/components/app/form'
import { useCreateProduct } from '@/hooks'
import { showToast } from '@/utils'
import { DialogConfirmAddProduct } from '@/components/app/dialog'

const AddProduct: React.FC = () => {
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation('products')
  const { mutate: createProduct } = useCreateProduct()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<IProductInfoCreate | null>(null)
  const [formRef, setFormRef] = useState<React.RefObject<HTMLFormElement> | null>(null)
  const [resetForm, setResetForm] = useState(false)

  const handleFormCreateSubmit = (
    data: IProductInfoCreate,
    ref: React.RefObject<HTMLFormElement>
  ) => {
    setFormData(data)
    setFormRef(ref)
    setIsDialogOpen(true)
  }

  const handleConfirm = () => {
    if (formData) {
      setIsDialogOpen(false)
      const apiProductData: IApiProductInfoCreate = {
        code: formData.code,
        name: formData.name,
        provider: formData.provider,
        unit: formData.unit.slug,
        description: formData.description
      }
      createProduct(apiProductData, {
        onSuccess: () => {
          showToast(tToast('toast.createProductSuccess'))
          setResetForm(true)
          setFormData(null)
          setFormRef(null)
        }
      })
    }
  }

  return (
    <div className="flex relative flex-1 items-start rounded-lg shadow-none">
      <div className="grid items-start mx-auto w-full gap68">
        <div className="grid w-full">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center w-full border-b">
              <div className="flex flex-col gap-2 items-start py-2">
                <CardTitle>{t('products.addProductTitle')}</CardTitle>
                <CardDescription>{t('products.addProductDescription')}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <AddNewProductForm
                onSubmit={handleFormCreateSubmit}
                resetForm={resetForm}
                setResetForm={setResetForm}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <DialogConfirmAddProduct
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        productData={formData}
      />
    </div>
  )
}

export default AddProduct
