import { RequisitionStatus, UserApprovalStage } from '@/constants'
import { ProductRequisitionRoleApproval, ProductRequisitionStatus } from '@/types'

export interface RequestStatusBadgeProps {
  isRecalled: boolean
  status: ProductRequisitionStatus
  roleApproval: ProductRequisitionRoleApproval
}

const getBadgeColorClass = (
  status: ProductRequisitionStatus,
  roleApproval: ProductRequisitionRoleApproval,
  isRecalled: boolean
) => {
  switch (roleApproval) {
    case UserApprovalStage.APPROVAL_STAGE_1:
      if (status === RequisitionStatus.WAITING && !isRecalled) return 'bg-yellow-500'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'bg-red-500'
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) return 'bg-green-500'
      break
    case UserApprovalStage.APPROVAL_STAGE_2:
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) return 'bg-yellow-500'
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled) return 'bg-yellow-500'
      if (status === RequisitionStatus.ACCEPTED_STAGE_2) return 'bg-green-500'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'bg-red-500'
      if (status === RequisitionStatus.WAITING && isRecalled) return 'bg-red-500'
      break
    case UserApprovalStage.APPROVAL_STAGE_3:
      if (status === RequisitionStatus.ACCEPTED_STAGE_2) return 'bg-yellow-500'
      if (status === RequisitionStatus.WAITING_EXPORT) return 'bg-green-500'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'bg-red-500'
      break
  }
  return 'bg-gray-500' // Default color if no condition is met
}

const getBadgeText = (
  status: ProductRequisitionStatus,
  roleApproval: ProductRequisitionRoleApproval,
  isRecalled: boolean
) => {
  switch (roleApproval) {
    case UserApprovalStage.APPROVAL_STAGE_1:
      if (status === RequisitionStatus.WAITING && !isRecalled) return 'Chờ duyệt'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'Đã hủy'
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) return 'Đã duyệt'
      break
    case UserApprovalStage.APPROVAL_STAGE_2:
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && !isRecalled) return 'Chờ duyệt'
      if (status === RequisitionStatus.ACCEPTED_STAGE_1 && isRecalled)
        return 'Chờ duyệt bước 2 (bị hoàn lại từ bước trên)'
      if (status === RequisitionStatus.ACCEPTED_STAGE_2) return 'Đã duyệt'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'Đã hủy'
      if (status === RequisitionStatus.WAITING && isRecalled) return 'Bị hoàn lại để xem xét'
      break
    case UserApprovalStage.APPROVAL_STAGE_3:
      if (status === RequisitionStatus.ACCEPTED_STAGE_2) return 'Đang chờ duyệt'
      if (status === RequisitionStatus.WAITING_EXPORT) return 'Đã duyệt'
      if (status === RequisitionStatus.CANCEL && isRecalled) return 'Đã hủy'
      break
  }
  return 'Không xác định'
}

export const ProductRequisitionStatusBadge: React.FC<RequestStatusBadgeProps> = ({
  status,
  roleApproval,
  isRecalled
}) => {
  return (
    <span
      className={`inline-block py-1.5 px-2.5 min-w-[7rem] text-center ${getBadgeColorClass(status, roleApproval, isRecalled)} rounded-full text-white`}
    >
      {getBadgeText(status, roleApproval, isRecalled)}
    </span>
  )
}
