import { RequestRequisitionType } from '@/types'

export interface RequestTypeBadgeProps {
  type: RequestRequisitionType
}

const getBadgeColorClass = (type: RequestRequisitionType) => {
  switch (type) {
    case 'normal':
      return 'bg-green-500'
    case 'urgent':
      return 'bg-red-500'
  }
}

const getBadgeText = (type: RequestRequisitionType) => {
  switch (type) {
    case 'normal':
      return 'Bình thường'
    case 'urgent':
      return 'Cần gấp'
  }
}

export const RequisitionTypeBadge: React.FC<RequestTypeBadgeProps> = ({ type }) => {
  return (
    <span className={`py-1.5 px-2.5 ${getBadgeColorClass(type)} rounded-full text-white`}>
      {getBadgeText(type)}
    </span>
  )
}
