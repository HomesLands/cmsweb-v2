import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  Input
} from '@/components/ui'
import { DialogAddProductRequest } from '@/components/app/dialog'
import { IProductInfo } from '@/types'

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>
  handleAddRequest: (product: IProductInfo) => void
}

export function CustomComponentRequest<TData>({
  table,
  handleAddRequest
}: ColumnVisibilityDropdownProps<TData>) {
  const { t } = useTranslation('tableData')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProductInfo | null>(null)

  const handleOpenDialog = (product: IProductInfo | null) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedProduct(null)
  }

  return (
    <>
      <Input
        placeholder="Nhập tên vật tư..."
        value={table.getColumn('productCode')?.getFilterValue() as string}
        onChange={(event) => table.getColumn('productCode')?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
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
      <Button variant="outline" onClick={() => handleOpenDialog(null)}>
        <PlusCircledIcon className="w-4 h-4 mr-2" />
        {t('tableData.addNewProduct')}
      </Button>
      <DialogAddProductRequest
        handleAddRequest={handleAddRequest}
        openDialog={openDialog}
        product={selectedProduct}
        component={null}
        onOpenChange={handleCloseDialog}
      />
    </>
  )
}
