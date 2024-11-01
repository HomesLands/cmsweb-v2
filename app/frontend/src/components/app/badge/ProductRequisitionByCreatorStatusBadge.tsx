import { ProductRequisitionStatus } from '@/types'

export interface ProductRequisitionByCreatorStatusBadgeProps {
  isRecalled: boolean
  status: ProductRequisitionStatus
}

const getBadgeColorClass = (status: ProductRequisitionStatus, isRecalled: boolean): string => {
  if (isRecalled) {
    return 'bg-red-500'
  }
  switch (status) {
    case 'waiting':
    case 'accepted_stage_1':
      return 'bg-yellow-500'
    case 'accepted_stage_2':
      return 'bg-yellow-500'
    case 'waiting_export':
      return 'bg-green-500'
    case 'cancel':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getBadgeText = (status: ProductRequisitionStatus, isRecalled: boolean): string => {
  if (isRecalled) {
    switch (status) {
      case 'cancel':
        return 'Đã bị hủy'
      case 'waiting':
        return 'Bị hoàn ở bước 2'
      case 'accepted_stage_1':
        return 'Bị hoàn ở bước 3'
      default:
        return 'Bị hoàn'
    }
  }
  switch (status) {
    case 'waiting':
      return 'Chờ duyệt bước 1'
    case 'accepted_stage_1':
      return 'Đã duyệt bước 1'
    case 'accepted_stage_2':
      return 'Đã duyệt bước 2'
    case 'waiting_export':
      return 'Đã duyệt bước 3'
    case 'cancel':
      return 'Đã bị hủy'
    default:
      return 'Không xác định'
  }
}

export const ProductRequisitionByCreatorStatusBadge: React.FC<
  ProductRequisitionByCreatorStatusBadgeProps
> = ({ status, isRecalled }) => {
  return (
    <span
      className={`inline-block py-1.5 px-2.5 min-w-[8.5rem] text-center ${getBadgeColorClass(status, isRecalled)} rounded-full text-white`}
    >
      {getBadgeText(status, isRecalled)}
    </span>
  )
}
