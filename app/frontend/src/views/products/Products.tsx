import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useProducts } from '@/hooks'
import { useProductColumns } from './data-table'

export default function Products() {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { t } = useTranslation('products')

  const { data, isLoading } = useProducts({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('products.list')}
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={useProductColumns()}
        data={data?.result.items || []}
        pages={data?.result.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
