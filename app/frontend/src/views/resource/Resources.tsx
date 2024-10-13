import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useAuthorites, usePagination, useResources } from '@/hooks'
import { useResourceColumns } from './Datatable/columns'

const Resources: React.FC = () => {
  const { t } = useTranslation(['resources'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: resources, isLoading } = useResources({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('resources.list')}
      </Label>
      <DataTable
        columns={useResourceColumns()}
        data={resources?.items || []}
        pages={resources?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Resources
