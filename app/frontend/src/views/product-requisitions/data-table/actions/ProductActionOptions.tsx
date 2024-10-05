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
import { DialogAddProductRequest } from '@/components/app/dialog'
import { IProductInfo, IProductRequisitionInfo } from '@/types'

export default function ProductActionOptions({ table }: DataTableActionOptionsProps<IProductInfo>) {
  const { t } = useTranslation('tableData')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProductRequisitionInfo | null>(null)

  const handleOpenDialog = (product: IProductRequisitionInfo) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const onOpenChange = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-normal">
            {t('tablePaging.chooseColumn')}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" onClick={() => handleOpenDialog({} as IProductRequisitionInfo)}>
        <PlusCircledIcon className="w-4 h-4 mr-2" />
        {t('tableData.addNewProduct')}
      </Button>
      {openDialog && (
        <DialogAddProductRequest
          openDialog={openDialog}
          product={selectedProduct?.product}
          component={null}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  )
}
