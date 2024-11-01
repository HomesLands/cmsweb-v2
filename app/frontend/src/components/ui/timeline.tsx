import moment from 'moment'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from './badge'
import { ITimeline } from '@/types'
import { Button } from './button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TimelineProps {
  items: ITimeline[]
}

export default function RequisitionTimeline({ items }: TimelineProps) {
  const { t } = useTranslation('productRequisition')
  const [isOpen, setIsOpen] = useState(false)

  const toggleContent = () => setIsOpen(!isOpen)

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold font-beVietNam">
          {t('productRequisition.approvalHistory')}
        </span>
        <Button onClick={toggleContent} variant="ghost">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className="px-6 mt-4 sm:px-10">
          <div className="relative grid gap-10 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="relative text-sm">
                  <div
                    className={`aspect-square w-3 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 ${
                      item.status === 'accept'
                        ? 'bg-green-500'
                        : item.status === 'cancel'
                          ? 'bg-red-500'
                          : item.status === 'give_back'
                            ? 'bg-yellow-500'
                            : 'bg-gray-900'
                    }`}
                  />
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {moment(item.createdAt).format('HH:mm DD/MM/YYYY')}
                    </span>{' '}
                    - <span className="font-bold">{item.user}</span> -{' '}
                    {item.role === 'approval_stage_1'
                      ? t('productRequisition.approvalStage1')
                      : item.role === 'approval_stage_2'
                        ? t('productRequisition.approvalStage2')
                        : item.role === 'approval_stage_3'
                          ? t('productRequisition.approvalStage3')
                          : item.role}
                    {'  '}
                    <Badge
                      className={`ml-2 px-5 py-1 ${
                        item.status === 'accept'
                          ? 'bg-green-100 border-green-500 text-green-500'
                          : item.status === 'cancel'
                            ? 'bg-red-100 border-red-500 text-red-500'
                            : item.status === 'give_back'
                              ? 'bg-yellow-100 border-yellow-500 text-yellow-500'
                              : 'bg-gray-900'
                      }`}
                    >
                      {t(`productRequisition.${item.status}`)}
                    </Badge>
                  </div>
                  <div className="mt-2 text-gray-500 dark:text-gray-400">
                    {t('productRequisition.approvalContent')}
                    {item.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('productRequisition.noApprovalHistory')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
