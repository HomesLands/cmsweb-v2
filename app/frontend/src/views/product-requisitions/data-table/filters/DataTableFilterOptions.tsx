import {
  DataTableFilterOptionsProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { FilterRequisitionStatus, RequisitionStatus, UserApprovalStage } from '@/constants'
import {
  IRequisitionFormResponseForApprover,
  ProductRequisitionRoleApproval,
  ProductRequisitionStatus
} from '@/types'
import { ColumnFiltersState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DataTableFilterOptions({
  data,
  setFilterOption
}: DataTableFilterOptionsProps<IRequisitionFormResponseForApprover>) {
  const { t } = useTranslation('tableData')
  const [availableRoleApprovals, setAvailableRoleApprovals] = useState<string[]>([])
  const [filterValue, setFilterValue] = useState<string>('all')

  const handleFilterChange = (value: string) => {
    setFilterValue(value)

    let filterConditions: ColumnFiltersState = []

    const applyFilter = (
      roleApproval: ProductRequisitionRoleApproval,
      status: ProductRequisitionStatus,
      isRecalled: boolean
    ) => {
      filterConditions = [
        { id: 'roleApproval', value: roleApproval },
        { id: 'status', value: status },
        { id: 'isRecalled', value: isRecalled }
      ]
    }

    switch (value) {
      // Approval Stage 1
      case FilterRequisitionStatus.WAITING_APPROVAL_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.WAITING, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.ACCEPTED_STAGE_1, false)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_1:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_1, RequisitionStatus.CANCEL, true)
        break

      // Approval Stage 2
      case FilterRequisitionStatus.WAITING_APPROVAL_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.ACCEPTED_STAGE_1, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.ACCEPTED_STAGE_2, false)
        break
      case FilterRequisitionStatus.RETURNED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.WAITING, true)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_2:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_2, RequisitionStatus.CANCEL, true)
        break

      // Approval Stage 3
      case FilterRequisitionStatus.WAITING_APPROVAL_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.ACCEPTED_STAGE_2, false)
        break
      case FilterRequisitionStatus.APPROVED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.WAITING_EXPORT, false)
        break
      case FilterRequisitionStatus.RETURNED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.ACCEPTED_STAGE_1, true)
        break
      case FilterRequisitionStatus.CANCELED_STAGE_3:
        applyFilter(UserApprovalStage.APPROVAL_STAGE_3, RequisitionStatus.CANCEL, true)
        break

      default:
        filterConditions = []
    }

    setFilterOption(filterConditions)
  }

  useEffect(() => {
    // Extract unique roleApproval values from the data
    const roleApprovals = data.map(
      (item) => (item as IRequisitionFormResponseForApprover).roleApproval
    )
    setAvailableRoleApprovals(roleApprovals)
  }, [data])

  return (
    <Select value={filterValue} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[12rem]">
        <SelectValue placeholder={t('tablePaging.filter')} />
      </SelectTrigger>
      <SelectContent side="top">
        <SelectItem value="all">{t('tableData.all')}</SelectItem>
        {availableRoleApprovals.includes('approval_stage_1') && (
          <>
            <SelectItem value="waiting_approval_1">{t('tableData.waiting_approval_1')}</SelectItem>
            <SelectItem value="approved_stage_1">{t('tableData.approved_stage_1')}</SelectItem>
            <SelectItem value="canceled_stage_1">{t('tableData.canceled_stage_1')}</SelectItem>
          </>
        )}

        {availableRoleApprovals.includes('approval_stage_2') && (
          <>
            <SelectItem value="waiting_approval_2">{t('tableData.waiting_approval_2')}</SelectItem>
            <SelectItem value="approved_stage_2">{t('tableData.approved_stage_2')}</SelectItem>
            <SelectItem value="returned_stage_2">{t('tableData.returned_stage_2')}</SelectItem>
            <SelectItem value="canceled_stage_2">{t('tableData.canceled_stage_2')}</SelectItem>
          </>
        )}

        {availableRoleApprovals.includes('approval_stage_3') && (
          <>
            <SelectItem value="waiting_approval_3">{t('tableData.waiting_approval_3')}</SelectItem>
            <SelectItem value="approved_stage_3">{t('tableData.approved_stage_3')}</SelectItem>
            <SelectItem value="returned_stage_3">{t('tableData.returned_stage_3')}</SelectItem>
            <SelectItem value="canceled_stage_3">{t('tableData.canceled_stage_3')}</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
