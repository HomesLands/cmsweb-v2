import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  DataTableActionOptionsProps
} from '@/components/ui'
import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { IProductRequisitionFormInfo } from '@/types'

export default function ProductRequisitionActionOptions({
  table
}: DataTableActionOptionsProps<IProductRequisitionFormInfo>) {
  const { t } = useTranslation('productRequisition')
  const { t: tTablePaging } = useTranslation('tableData')
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-[0.8rem]">
            {tTablePaging('tablePaging.chooseColumn')}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
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
        <Button variant="outline" className="flex gap-1 font-beVietNam text-[0.8rem]">
          <PlusCircledIcon className="icon" />
          {t('productRequisition.createProductRequisitions')}
        </Button>
      </NavLink>
    </div>
  )
}
