import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useCompanies } from '@/hooks'
import { useCompanyColumns } from './data-table'

const Companies: React.FC = () => {
  const { t } = useTranslation(['companies'])
  const { data: companies, isLoading } = useCompanies()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('companies.list')}
      </Label>
      <DataTable
        columns={useCompanyColumns()}
        data={companies?.result || []}
        isLoading={isLoading}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  )
}

export default Companies
