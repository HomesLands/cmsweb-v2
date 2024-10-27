import { RequisitionStatus } from '@/constants'
import { ProductRequisitionStatus } from '@/types'

export interface RequestStatusBadgeProps {
  roleApproval: string
  isRecalled: boolean
  status: ProductRequisitionStatus
}

const getBadgeColorClass = (
  roleApproval: string,
  status: ProductRequisitionStatus,
  isRecalled: boolean
) => {
  if (roleApproval === 'approval_stage_1' && status === RequisitionStatus.WAITING && !isRecalled) {
    return 'bg-yellow-500'
  }
  if (roleApproval === 'approval_stage_1' && status === RequisitionStatus.CANCEL && isRecalled) {
    return 'bg-red-500'
  }
  if (
    roleApproval === 'approval_stage_2' &&
    status === RequisitionStatus.ACCEPTED_STAGE_1 &&
    !isRecalled
  ) {
    return 'bg-yellow-500'
  }
  if (
    roleApproval === 'approval_stage_3' &&
    status === RequisitionStatus.ACCEPTED_STAGE_2 &&
    !isRecalled
  ) {
    return 'bg-yellow-500'
  }

  // Các trường hợp khác
  switch (status) {
    case RequisitionStatus.WAITING:
      return isRecalled ? 'bg-orange-500' : 'bg-blue-500'
    case RequisitionStatus.ACCEPTED_STAGE_1:
      return isRecalled ? 'bg-orange-500' : 'bg-blue-500'
    case RequisitionStatus.ACCEPTED_STAGE_2:
      return 'bg-indigo-500'
    case RequisitionStatus.WAITING_EXPORT:
      return 'bg-green-500'
    case RequisitionStatus.CANCEL:
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getBadgeText = (
  roleApproval: string,
  status: ProductRequisitionStatus,
  isRecalled: boolean
) => {
  if (roleApproval === 'approval_stage_1' && status === RequisitionStatus.WAITING && !isRecalled) {
    return 'Đang chờ duyệt'
  }
  if (roleApproval === 'approval_stage_1' && status === RequisitionStatus.CANCEL && isRecalled) {
    return 'Bị hoàn ở bước 1'
  }
  if (
    roleApproval === 'approval_stage_2' &&
    status === RequisitionStatus.ACCEPTED_STAGE_1 &&
    !isRecalled
  ) {
    return 'Đang chờ duyệt'
  }
  if (
    roleApproval === 'approval_stage_3' &&
    status === RequisitionStatus.ACCEPTED_STAGE_2 &&
    !isRecalled
  ) {
    return 'Đang chờ duyệt'
  }

  // Các trường hợp khác
  switch (status) {
    case RequisitionStatus.WAITING:
      return isRecalled ? 'Bị hoàn ở bước 2' : 'Chờ duyệt bước 1'
    case RequisitionStatus.ACCEPTED_STAGE_1:
      return isRecalled ? 'Bị hoàn ở bước 3' : 'Đã duyệt bước 1'
    case RequisitionStatus.ACCEPTED_STAGE_2:
      return 'Đã duyệt bước 2'
    case RequisitionStatus.WAITING_EXPORT:
      return 'Đã duyệt bước 3'
    case RequisitionStatus.CANCEL:
      return isRecalled ? 'Đã bị hoàn ở bước 1' : 'Đã bị hủy'
    default:
      return 'Không xác định'
  }
}

export const ProductRequisitionStatusBadge: React.FC<RequestStatusBadgeProps> = ({
  roleApproval,
  status,
  isRecalled
}) => {
  return (
    <span
      className={`inline-block py-1.5 px-2.5 min-w-[8rem] text-center ${getBadgeColorClass(roleApproval, status, isRecalled)} rounded-full text-white`}
    >
      {getBadgeText(roleApproval, status, isRecalled)}
    </span>
  )
}
