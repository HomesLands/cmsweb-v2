import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useDepartmentColumns } from './DataTable/columns'
import { useDepartments } from '@/hooks/use-departments'

const Departments: React.FC = () => {
  const { t } = useTranslation(['department'])
  //   const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: departments, isLoading } = useDepartments()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('department.list')}
      </Label>
      <DataTable
        columns={useDepartmentColumns()}
        data={
          Array.isArray(departments?.result)
            ? departments.result
            : departments?.result
              ? [departments.result]
              : []
        }
        isLoading={isLoading}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  )
}

export default Departments
