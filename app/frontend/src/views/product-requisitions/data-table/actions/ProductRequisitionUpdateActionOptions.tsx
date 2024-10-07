import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  DataTableActionOptionsProps
} from '@/components/ui'
import {
  DialogAddProductInRequisitionUpdate,
  DialogAddProductRequest
} from '@/components/app/dialog'
import { IAddNewProductInRequisitionUpdate, IProductInfo } from '@/types'
import { useParams } from 'react-router'
import { useAddNewProductInRequisitionUpdate } from '@/hooks'
import { showToast } from '@/utils'

export default function ProductRequisitionUpdateActionOptions({
  table
}: DataTableActionOptionsProps<IProductInfo>) {
  const { t } = useTranslation('tableData')
  const { t: tToast } = useTranslation('toast')
  const [openDialog, setOpenDialog] = useState(false)
  const { slug } = useParams()
  const [product, setProduct] = useState<IProductInfo | null>(null)
  const { mutate: addNewProduct } = useAddNewProductInRequisitionUpdate(slug as string)
  const handleOpenDialog = (product: IProductInfo) => {
    setProduct(product)
    setOpenDialog(true)
  }

  const onOpenChange = () => {
    setOpenDialog(false)
  }

  const handleAddNewProduct = (data: IAddNewProductInRequisitionUpdate) => {
    addNewProduct(data, {
      onSuccess: () => {
        console.log('success')
        showToast(tToast('toast.addNewProductSuccess'))
      }
    })
  }

  return (
    <>
      <Button variant="outline" onClick={() => handleOpenDialog(product as IProductInfo)}>
        <PlusCircledIcon className="mr-2 w-4 h-4" />
        {t('tableData.addNewProduct')}
      </Button>
      {openDialog && (
        <DialogAddProductInRequisitionUpdate
          formSlug={slug as string}
          openDialog={openDialog}
          product={product}
          component={null}
          onOpenChange={onOpenChange}
          handleAddNewProduct={handleAddNewProduct}
        />
      )}
    </>
  )
}
