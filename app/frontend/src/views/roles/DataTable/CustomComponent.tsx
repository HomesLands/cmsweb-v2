import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button
} from '@/components/ui'
import { ChevronDown } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { NavLink } from 'react-router-dom'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>
}

export function CustomComponent<TData>({ table }: ColumnVisibilityDropdownProps<TData>) {
  const { t } = useTranslation('productRequisition')
  const { t: tTablePaging } = useTranslation('tableData')
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-normal">
            {tTablePaging('tablePaging.chooseColumn')}
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
      <NavLink to="/product-requisitions/add">
        <Button variant="outline" className="flex gap-1 font-beVietNam text-normal">
          <PlusCircledIcon className="icon" />
          {t('productRequisition.createProductRequisitions')}
        </Button>
      </NavLink>
    </>
  )
}
