import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button
} from '@/components/ui'
import { ChevronDown } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { DialogAddUser } from '@/components/app/dialog'
import { useTranslation } from 'react-i18next'

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>
}

export function CustomComponent<TData>({ table }: ColumnVisibilityDropdownProps<TData>) {
  const { t } = useTranslation('tableData')
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
      <DialogAddUser />
    </>
  )
}
