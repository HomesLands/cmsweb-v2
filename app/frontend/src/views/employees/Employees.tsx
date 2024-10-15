import React from 'react'

import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useUsers } from '@/hooks'
import { useEmployeeColumns } from './data-table'
import { useTranslation } from 'react-i18next'

const Employees: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { t } = useTranslation('employees')

  const { data, isLoading } = useUsers({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('employees.list')}
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={useEmployeeColumns()}
        data={data?.result.items || []}
        pages={data?.result.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}

export default Employees
