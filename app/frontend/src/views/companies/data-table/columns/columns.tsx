import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui'
import { ICompany } from '@/types'
import { publicFileURL } from '@/constants'
import { DialogUpdateCompany, DialogUpdateRole } from '@/components/app/dialog'

export const useCompanyColumns = (): ColumnDef<ICompany>[] => {
  const { t } = useTranslation(['companies'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('companies.slug')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('companies.name')} />
    },
    {
      accessorKey: 'logo',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('companies.logo')} />,
      cell: ({ row }) => {
        const { logo } = row.original
        return (
          <div>
            <img src={`${publicFileURL}/${logo}`} className="w-20" />
          </div>
        )
      }
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const company = row.original
        console.log({ company })
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-8 h-8">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                {/* <DialogUpdateCompany role={null} /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
