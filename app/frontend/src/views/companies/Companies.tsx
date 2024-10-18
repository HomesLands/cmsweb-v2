import React from 'react'

import { DataTable, Label } from '@/components/ui'
import { useCompanies } from '@/hooks'
import { useCompanyColumns } from './data-table'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

const Companies: React.FC = () => {
  const { data: companies, isLoading } = useCompanies()
  const { t } = useTranslation('companies')

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
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
