import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, usePermissions } from '@/hooks'

interface SelectPermissionProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectPermission: FC<SelectPermissionProps> = ({ onChange }) => {
  const { t } = useTranslation('productRequisition')
  const { pagination } = usePagination({ isSearchParams: false })
  const { data } = usePermissions({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: 1000
  })

  const loadPermissions = () => {
    return (
      data?.items.map((item) => ({
        label: item ? `${item.authority} - ${item.resource}` : '',
        value: item.slug || ''
      })) || []
    )
  }

  return (
    <ReactSelect
      // onMenuScrollToBottom={handleScrollToBottom}
      options={loadPermissions()}
      onChange={onChange}
    />
  )
}
