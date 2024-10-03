import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

import { DataTable, Label } from '@/components/ui'
import { useColumnsRequisitionList } from './data-table/columns/columns'
import { usePagination, useProductRequisitionByApprover } from '@/hooks'
import { IRequisitionFormResponseForApprover } from '@/types'
import { DataTableFilterOptions } from './data-table'

const ApprovalProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])
  const [, setSelectedRequisition] = useState<IRequisitionFormResponseForApprover | null>(null)
  const { pagination, handlePageChange, handlePageSizeChange } = usePagination()
  const navigate = useNavigate()

  const { data, isLoading } = useProductRequisitionByApprover({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })

  const tableData: IRequisitionFormResponseForApprover[] = useMemo(() => {
    return (
      data?.result?.items?.map(
        (item): IRequisitionFormResponseForApprover => ({
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          approvalUserSlug: item.approvalUserSlug,
          roleApproval: item.roleApproval,
          slug: item.slug,
          productRequisitionForm: item.productRequisitionForm
        })
      ) || []
    )
  }, [data?.result?.items])

  const handleRowClick = (requisition: IRequisitionFormResponseForApprover) => {
    setSelectedRequisition(requisition)
    navigate(`/product-requisitions/approval/${requisition.productRequisitionForm.slug}`, {
      state: { selectedRequisition: requisition }
    })
  }

  const columns = useColumnsRequisitionList()

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.list')}
      </Label>

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={tableData}
        pages={data?.result?.totalPages || 0}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onRowClick={handleRowClick}
        filterOptions={DataTableFilterOptions}
      />
    </div>
  )
}

export default ApprovalProductRequisitions
