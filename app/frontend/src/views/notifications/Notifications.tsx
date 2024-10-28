import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Label } from '@/components/ui'
import { useNotification, usePagination } from '@/hooks'

export default function Notification() {
  const { pagination } = usePagination({ isSearchParams: false })
  const { t } = useTranslation('notifications')

  const { data } = useNotification({
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
      {/* <DataTable
        isLoading={isLoading}
        columns={useNotificationColumns()}
        data={data?.result || []}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      /> */}
    </div>
  )
}
