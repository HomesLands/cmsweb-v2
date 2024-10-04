import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  Input,
  DataTableActionOptionsProps
} from '@/components/ui'
import { ChevronDown } from 'lucide-react'
import { DialogAddUser } from '@/components/app/dialog'
import { useTranslation } from 'react-i18next'
import { IUserInfo } from '@/types'

export default function EmployeeActionOptions({ table }: DataTableActionOptionsProps<IUserInfo>) {
  const { t } = useTranslation('tableData')
  return (
    <>
      <Input
        placeholder="Nhập họ tên..."
        value={table.getColumn('createdBy')?.getFilterValue() as string}
        onChange={(event) => table.getColumn('createdBy')?.setFilterValue(event.target.value)}
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
      <DialogAddUser />
    </>
  )
}
