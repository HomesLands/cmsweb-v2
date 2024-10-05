import { RequisitionStatus } from '@/constants'
import { ProductRequisitionStatus } from '@/types'

export interface RequestStatusBadgeProps {
  isRecalled: boolean
  status: ProductRequisitionStatus
}

const getBadgeColorClass = (status: ProductRequisitionStatus, isRecalled: boolean) => {
  switch (status) {
    case RequisitionStatus.WAITING:
      return isRecalled ? 'bg-red-500' : 'bg-yellow-500'
    case RequisitionStatus.ACCEPTED_STAGE_1:
      return 'bg-blue-500'
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

const getBadgeText = (status: ProductRequisitionStatus, isRecalled: boolean) => {
  switch (status) {
    case RequisitionStatus.WAITING:
      return isRecalled ? 'Bị hoàn lại' : 'Chờ duyệt bước 1'
    case RequisitionStatus.ACCEPTED_STAGE_1:
      return 'Đã duyệt bước 1'
    case RequisitionStatus.ACCEPTED_STAGE_2:
      return 'Đã duyệt bước 2'
    case RequisitionStatus.WAITING_EXPORT:
      return 'Chờ xuất kho'
    case RequisitionStatus.CANCEL:
      return 'Đã hủy'
    default:
      return 'Không xác định'
  }
}

export const ProductRequisitionStatusBadge: React.FC<RequestStatusBadgeProps> = ({
  status,
  isRecalled
}) => {
  return (
    <span
      className={`inline-block py-1.5 px-2.5 min-w-[7rem] text-center ${getBadgeColorClass(status, isRecalled)} rounded-full text-white`}
    >
      {getBadgeText(status, isRecalled)}
    </span>
  )
}
