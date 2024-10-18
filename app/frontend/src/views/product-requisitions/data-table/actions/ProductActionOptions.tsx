import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui'
import { DialogAddProductRequest } from '@/components/app/dialog'
import { IProductInfo } from '@/types'

export default function ProductActionOptions() {
  const { t } = useTranslation('tableData')
  const [openDialog, setOpenDialog] = useState(false)
  const [product, setProduct] = useState<IProductInfo | null>(null)
  const handleOpenDialog = (product: IProductInfo) => {
    setProduct(product)
    setOpenDialog(true)
  }

  const onOpenChange = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Button variant="outline" onClick={() => handleOpenDialog(product as IProductInfo)}>
        <PlusCircledIcon className="mr-2 w-4 h-4" />
        {t('tableData.addNewProduct')}
      </Button>
      {openDialog && (
        <DialogAddProductRequest
          openDialog={openDialog}
          product={product}
          component={null}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  )
}
