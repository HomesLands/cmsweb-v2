import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { columns } from './DataTable/columns'
import { useProducts, usePagination } from '@/hooks'
import { CustomComponent } from './CustomComponent'

const ProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data } = useProducts({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('product_requisition.list')}
      </Label>
      <DataTable
        columns={columns}
        data={data?.items || []}
        total={data?.total || 0}
        pages={data?.pages || 0}
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
