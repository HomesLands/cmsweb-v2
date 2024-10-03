import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthorites } from '@/hooks'
import ReactSelect, { SingleValue } from 'react-select'

interface SelectAuthorityProps {
  onChange: (
    values: SingleValue<{
      value: string
      label: string
    }>
  ) => void
}

export const SelectAuthority: FC<SelectAuthorityProps> = ({ onChange }) => {
  const { t } = useTranslation('productRequisition')
  const { data: authorities } = useAuthorites({ order: 'DESC', page: 1, pageSize: 10 })

  // const handleScrollToBottom = () => {
  //   if (authorities?.page && authorities.totalPages) {
  //     if (authorities.page < authorities.totalPages) handlePageChange(pagination.pageIndex + 1)
  //   }
  // }

  // // Effect to append new roles to the local state when roles are fetched
  // useEffect(() => {
  //   if (roles?.items) {
  //     const newRoles = roles.items.map((item) => ({
  //       value: item.slug || '',
  //       label: item.nameNormalize || ''
  //     }))
  //     // Append new roles to the previous roles
  //     setAllRoles((prevRoles) => [...prevRoles, ...newRoles])
  //   }
  // }, [roles])

  // return (
  //   <ReactSelect
  //     onMenuScrollToBottom={handleScrollToBottom}
  //     options={allRoles}
  //     onChange={onChange}
  //   />
  // )
}
