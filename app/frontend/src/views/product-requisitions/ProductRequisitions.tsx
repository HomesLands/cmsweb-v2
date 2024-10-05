import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useProductRequisitionByCreator } from '@/hooks'
import { ProductRequisitionActionOptions, useColumnsRequisitionListCreator } from './data-table'

const ProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()

  const { data, isLoading } = useProductRequisitionByCreator({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.listEmployee')}
      </Label>

      <DataTable
        isLoading={isLoading}
        columns={useColumnsRequisitionListCreator()}
        data={data?.result.items || []}
        pages={data?.result?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        actionOptions={ProductRequisitionActionOptions}
      />
    </div>
  )
}

export default ProductRequisitions
