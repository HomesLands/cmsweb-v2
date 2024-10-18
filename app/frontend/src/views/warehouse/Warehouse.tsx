import React from 'react'
import { useTranslation } from 'react-i18next'

import { DataTable, Label } from '@/components/ui'
import { useGetApprovedProductRequisition, usePagination } from '@/hooks'
import { useWarehouseColumns } from './DataTable/columns'
import { ReaderIcon } from '@radix-ui/react-icons'

const Warehouse: React.FC = () => {
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const { t } = useTranslation(['warehouse'])
  const { data: approvedProductRequisition, isLoading: isLoadingApprovedProductRequisition } =
    useGetApprovedProductRequisition({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      order: 'DESC'
    })

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('warehouse.approvedRequisitionList')}
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
