import { RequestStatus } from '@/types'

export interface RequestStatusBadgeProps {
  status: RequestStatus
}

const getBadgeColorClass = (status: RequestStatus) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getBadgeText = (status: RequestStatus) => {
  switch (status) {
    case 'approved':
      return 'Đã duyệt'
    case 'pending':
      return 'Đang chờ'
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
