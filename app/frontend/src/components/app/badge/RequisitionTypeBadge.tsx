import { ProductRequisitionType } from '@/types'

export interface RequestTypeBadgeProps {
  type: ProductRequisitionType
}

const getBadgeColorClass = (type: ProductRequisitionType) => {
  switch (type) {
    case 'normal':
      return 'bg-green-500'
    case 'urgent':
      return 'bg-red-500'
  }
}

const getBadgeText = (type: ProductRequisitionType) => {
  switch (type) {
    case 'normal':
      return 'Bình thường'
    case 'urgent':
      return 'Cần gấp'
  }
}

export const RequisitionTypeBadge: React.FC<RequestTypeBadgeProps> = ({ type }) => {
  return (
    <span
      className={`inline-block py-1.5 px-2.5 min-w-[7rem] text-xs font-beVietNam text-center ${getBadgeColorClass(type)} rounded-full text-white`}
    >
      {getBadgeText(type)}
    </span>
  )
}
