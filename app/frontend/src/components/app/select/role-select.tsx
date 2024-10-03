import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect from 'react-select'

import { usePagination, useRoles } from '@/hooks'

interface SelectRoleProps {
  onChange: (slug: string, directorSlug: string, name: string) => void
  defaultValue?: string
}

export const SelectRole: FC<SelectRoleProps> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const { data: roles } = useRoles({
    order: 'DESC',
    page: 1,
    pageSize: 10
  })

  const handleOnChange = () => {}

  const handleScrollToBottom = () => {
    // if (hasMore && !loading) {
    //   setPage((prevPage) => prevPage + 1) // Load next page
    // }
  }

  return <ReactSelect onMenuScrollToBottom={handleScrollToBottom} />
}
