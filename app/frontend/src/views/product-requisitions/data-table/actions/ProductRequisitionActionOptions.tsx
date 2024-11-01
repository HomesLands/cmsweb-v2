import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui'
import { ROUTE } from '@/constants'

export default function ProductRequisitionActionOptions() {
  const { t } = useTranslation('productRequisition')
  return (
    <div className="flex gap-2 items-center">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto text-[0.8rem]">
            {tTablePaging('tablePaging.chooseColumn')}
            <ChevronDown className="ml-2 w-4 h-4" />
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
      </DropdownMenu> */}
      <NavLink to={ROUTE.ADD_PRODUCT_REQUISITIONS}>
        <Button variant="outline" className="flex gap-1 font-beVietNam text-[0.8rem]">
          <PlusCircledIcon className="icon" />
          {t('productRequisition.createProductRequisitions')}
        </Button>
      </NavLink>
    </div>
  )
}
