import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, usePermissions } from '@/hooks'
import { usePermissionColumns } from './DataTable/columns'
import { CustomComponent } from './DataTable/CustomComponent'

const Permissions: React.FC = () => {
  const { t } = useTranslation(['authorities'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: authorities } = usePermissions({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('authorities.list')}
      </Label>
      <DataTable
        columns={usePermissionColumns()}
        data={authorities?.items || []}
        pages={authorities?.totalPages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponent}
        isLoading={false}
      />
    </div>
  )
}

export default Permissions
