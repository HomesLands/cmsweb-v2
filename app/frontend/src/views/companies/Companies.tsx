import React from 'react'

import { DataTable } from '@/components/ui'
import { useCompanies } from '@/hooks'
import { useCompanyColumns } from './data-table'

const Companies: React.FC = () => {
  const { data: companies, isLoading } = useCompanies()

  return (
    <div className="flex flex-col gap-4">
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
