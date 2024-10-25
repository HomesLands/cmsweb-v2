import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui'
import { IProject } from '@/types'
import { DialogDeleteProject, DialogUpdateProject } from '@/components/app/dialog'

export const useProjectColumns = (): ColumnDef<IProject>[] => {
  const { t } = useTranslation(['projects'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('projects.slug')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('projects.nameNormalize')} />
      )
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('projects.startDate')} />
      ),
      cell: ({ row }) => {
        const startDate = row.getValue('startDate')
        return startDate ? format(new Date(startDate as string), 'HH:mm dd/MM/yyyy') : ''
      }
    },
    {
      accessorKey: 'site.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('projects.site')} />
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('projects.description')} />
      )
    },
    {
      id: 'actions',
      header: 'Thao tác',
      cell: ({ row }) => {
        const project = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Thao tác</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DialogUpdateProject project={project} />
                <DialogDeleteProject project={project} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
