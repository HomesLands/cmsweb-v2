import { RequestRequisitionStatus } from '@/types'

export interface RequestStatusBadgeProps {
  status: RequestRequisitionStatus
}

const getBadgeColorClass = (status: RequestRequisitionStatus) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500'
    case 'waiting':
      return 'bg-yellow-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getBadgeText = (status: RequestRequisitionStatus) => {
  switch (status) {
    case 'approved':
      return 'Đã duyệt'
    case 'waiting':
      return 'Đang xét duyệt'
    case 'rejected':
      return 'Từ chối'
    default:
      return 'Hủy'
  }
}

export const ProductRequisitionStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status }) => {
  return (
    <span className={`py-1.5 px-2.5 ${getBadgeColorClass(status)} rounded-full text-white`}>
      {getBadgeText(status)}
    </span>
  )
}
