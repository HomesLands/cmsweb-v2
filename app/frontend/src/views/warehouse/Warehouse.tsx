import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useGetApprovedProductRequisition, usePagination } from '@/hooks'
import { useWarehouseColumns } from './DataTable/columns'
import { useDownloadStore } from '@/api/products'

const Warehouse: React.FC = () => {
  const { t } = useTranslation(['warehouse'])
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { data: approvedProductRequisition, isLoading: isLoadingApprovedProductRequisition } =
    useGetApprovedProductRequisition({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      order: 'DESC'
    })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('warehouse.list')}
      </Label>
      <DataTable
        columns={useWarehouseColumns()}
        data={approvedProductRequisition?.result.items || []}
        pages={approvedProductRequisition?.result?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoadingApprovedProductRequisition}
      />
    </div>
  )
}

export default Warehouse
