import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useNotification, usePagination } from '@/hooks'
import { useNotificationColumns } from './data-table'

export default function Notification() {
  const { pagination } = usePagination({ isSearchParams: false })
  const { t } = useTranslation('notifications')

  const { data, isLoading } = useNotification({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  })
  console.log(data)

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('notifications.title')}
      </Label>
      <DataTable
        isLoading={isLoading}
        columns={useNotificationColumns()}
        data={data?.result.items || []}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  )
}
