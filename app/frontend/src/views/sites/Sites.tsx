import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useSites } from '@/hooks'
// import { useAuthorityColumns } from '../authorities/DataTable/columns'
import { useSiteColumns } from './DataTable/columns'

const Sites: React.FC = () => {
  const { t } = useTranslation(['sites'])
  // const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: sites, isLoading } = useSites()

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('sites.list')}
      </Label>
      <DataTable
        columns={useSiteColumns()}
        data={sites?.result || []}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Sites
