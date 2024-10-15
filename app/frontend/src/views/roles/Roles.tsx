import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useRoles } from '@/hooks'
import { RoleActionOptions, useRoleColumns } from './data-table'

const Roles: React.FC = () => {
  const { t } = useTranslation(['roles'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: roles, isLoading } = useRoles({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('roles.list')}
      </Label>
      <DataTable
        columns={useRoleColumns()}
        data={roles?.items || []}
        pages={roles?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        actionOptions={RoleActionOptions}
      />
    </div>
  )
}

export default Roles
