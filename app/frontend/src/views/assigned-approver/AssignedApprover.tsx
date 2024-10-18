import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useAuthorities, usePagination } from '@/hooks'
import { useAuthorityColumns } from '@/views/authorities/data-table/columns/columns'

export default function AssignedApprover() {
  const { t } = useTranslation(['assignedApprover'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: authorities, isLoading } = useAuthorities({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('assignedApprover.list')}
      </Label>
      <DataTable
        columns={useAuthorityColumns()}
        data={authorities?.items || []}
        pages={authorities?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}
