import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, usePermissions } from '@/hooks'
import { usePermissionColumns } from './DataTable/columns'

const Permissions: React.FC = () => {
  const { t } = useTranslation(['permissions'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: permissions, isLoading } = usePermissions({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('permissions.list')}
      </Label>
      <DataTable
        columns={usePermissionColumns()}
        data={permissions?.items || []}
        pages={permissions?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Permissions
