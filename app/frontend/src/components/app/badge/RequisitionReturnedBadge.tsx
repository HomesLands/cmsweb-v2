import React from 'react'

interface RecalledStatusBadgeProps {
  status: string
  isRecalled: boolean
}

export const RecalledStatusBadge: React.FC<RecalledStatusBadgeProps> = ({ status, isRecalled }) => {
  let displayStatus = ''
  let textColor = ''

  if (status === 'cancel' && isRecalled) {
    displayStatus = 'Đã hoàn (Bước 1)'
    textColor = 'text-red-600'
  } else if (status === 'waiting' && isRecalled) {
    displayStatus = 'Đã hoàn (Bước 2)'
    textColor = 'text-red-600'
  } else if (status === 'accepted_stage_1' && isRecalled) {
    displayStatus = 'Đã hoàn (Bước 3)'
    textColor = 'text-red-600'
  } else if (status === 'cancel' && !isRecalled) {
    displayStatus = 'Đã hủy'
    textColor = 'text-red-600'
  }

  // Nếu không có displayStatus, không render gì cả
  if (!displayStatus) {
    return null
  }

  return (
    <span className={`px-2 py-1 ${textColor} min-w-[6rem] font-beVietNam`}>{displayStatus}</span>
  )
}
