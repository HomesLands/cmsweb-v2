import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

import { usePagination, useResources } from '@/hooks'

interface SelectResourceProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectResource: FC<SelectResourceProps> = ({ onChange }) => {
  const { t } = useTranslation('productRequisition')
  const { pagination } = usePagination({ isSearchParams: false })
  const { data: resources } = useResources({
    order: 'DESC',
    page: pagination.pageIndex,
    pageSize: 1000
  })

  const loadResources = () => {
    return (
      resources?.items.map((item) => ({
        value: item.slug || '',
        label: item.name || ''
      })) || []
    )
  }

  return <ReactSelect options={loadResources()} onChange={onChange} />
}
