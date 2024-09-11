import { Table } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  Input
} from '@/components/ui'
import { DialogAddProductRequest } from '@/components/app/dialog'

interface ColumnVisibilityDropdownProps<TData> {
  table: Table<TData>
}

export function CustomComponentRequest<TData>({ table }: ColumnVisibilityDropdownProps<TData>) {
  return (
    <>
      <Input
        placeholder="Nhập tên vật tư..."
        value={table.getColumn('createdBy')?.getFilterValue() as string}
        onChange={(event) => table.getColumn('createdBy')?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-normal">
            Chọn cột
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
      <DialogAddProductRequest />
    </>
  )
}
