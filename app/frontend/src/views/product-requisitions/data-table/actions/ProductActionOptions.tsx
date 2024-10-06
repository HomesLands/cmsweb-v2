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
import { IProductInfo } from '@/types'

export default function ProductActionOptions({ table }: DataTableActionOptionsProps<IProductInfo>) {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-normal">
            {t('tablePaging.chooseColumn')}
            <ChevronDown className="ml-2 w-4 h-4" />
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
