import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useAuthorites, usePagination } from '@/hooks'
import { useAuthorityColumns } from './DataTable/columns'

const Authorities: React.FC = () => {
  const { t } = useTranslation(['authorities'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data: authorities } = useAuthorites({
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
        columns={useAuthorityColumns()}
        data={authorities?.items || []}
        pages={authorities?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={false}
      />
    </div>
  )
}

export default Authorities
