import { RequestRequisitionRoleApproval, RequestRequisitionStatus } from '@/types'

export interface RequestStatusBadgeProps {
  isRecalled: boolean
  status: RequestRequisitionStatus
  roleApproval: RequestRequisitionRoleApproval
}

const getBadgeColorClass = (
  status: RequestRequisitionStatus,
  roleApproval: RequestRequisitionRoleApproval,
  isRecalled: boolean
) => {
  switch (roleApproval) {
    case 'approval_stage_1':
      if (status === 'waiting' && !isRecalled) return 'bg-yellow-500'
      if (status === 'cancel' && isRecalled) return 'bg-red-500'
      if (status === 'accepted_stage_1' && !isRecalled) return 'bg-green-500'
      break
    case 'approval_stage_2':
      if (status === 'accepted_stage_1' && !isRecalled) return 'bg-yellow-500'
      if (status === 'accepted_stage_1' && isRecalled) return 'bg-yellow-500'
      if (status === 'accepted_stage_2') return 'bg-green-500'
      if (status === 'cancel' && isRecalled) return 'bg-red-500'
      if (status === 'waiting' && isRecalled) return 'bg-red-500'
      break
    case 'approval_stage_3':
      if (status === 'accepted_stage_1' && isRecalled) return 'bg-red-500'
      if (status === 'waiting_export') return 'bg-green-500'
      if (status === 'cancel' && isRecalled) return 'bg-red-500'
      break
  }
  return 'bg-gray-500' // Default color if no condition is met
}

const getBadgeText = (
  status: RequestRequisitionStatus,
  roleApproval: RequestRequisitionRoleApproval,
  isRecalled: boolean
) => {
  switch (roleApproval) {
    case 'approval_stage_1':
      if (status === 'waiting' && !isRecalled) return 'Chờ duyệt'
      if (status === 'cancel' && isRecalled) return 'Đã hủy'
      if (status === 'accepted_stage_1' && !isRecalled) return 'Đã duyệt'
      break
    case 'approval_stage_2':
      if (status === 'accepted_stage_1' && !isRecalled) return 'Chờ duyệt'
      if (status === 'accepted_stage_1' && isRecalled)
        return 'Chờ duyệt bước 2 (bị hoàn lại từ bước trên)'
      if (status === 'accepted_stage_2') return 'Đã duyệt'
      if (status === 'cancel' && isRecalled) return 'Đã hủy'
      if (status === 'waiting' && isRecalled) return 'Bị hoàn lại để xem xét'
      break
    case 'approval_stage_3':
      if (status === 'accepted_stage_1' && isRecalled) return 'Đã bị hoàn để xem xét lại'
      if (status === 'waiting_export') return 'Đã duyệt'
      if (status === 'cancel' && isRecalled) return 'Đã hủy'
      break
  }
  return 'Không xác định' // Default text if no condition is met
}

export const ProductRequisitionStatusBadge: React.FC<RequestStatusBadgeProps> = ({
  status,
  roleApproval,
  isRecalled
}) => {
  return (
    <span
      className={`py-1.5 px-2.5 ${getBadgeColorClass(status, roleApproval, isRecalled)} rounded-full text-white`}
    >
      {getBadgeText(status, roleApproval, isRecalled)}
    </span>
  )
}
