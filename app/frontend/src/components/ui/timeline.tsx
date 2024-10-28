import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from './badge'

interface TimelineItem {
  user: string
  role: string
  status: string
  content: string
  createdAt: string
}

interface TimelineProps {
  items: TimelineItem[]
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const { t } = useTranslation('productRequisition')
  return (
    <div className="p-6 sm:p-10">
      <div className="relative grid gap-10 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
        {items.map((item, index) => (
          <div key={index} className="relative text-sm">
            {/* Status dot with conditional coloring */}
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
            {/* Timeline item content */}
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
        ))}
      </div>
    </div>
  )
}

export default Timeline
