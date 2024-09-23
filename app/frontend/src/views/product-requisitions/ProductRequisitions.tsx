import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { columns } from './DataTable/columns'
import { usePagination, useAllProductRequisition } from '@/hooks'
import { CustomComponent } from './CustomComponent'

const ProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { data, isLoading } = useAllProductRequisition({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  console.log('data in product requisitions', data?.result)

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.list')}
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.result?.items || []}
        pages={data?.result?.totalPages || 0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        CustomComponent={CustomComponent}
      />
    </div>
  )
}
export default ProductRequisitions
