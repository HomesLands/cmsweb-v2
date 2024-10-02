import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { useRoles } from '@/hooks'

interface SelectRoleProps {
  onChange: (slug: string, directorSlug: string, name: string) => void
  defaultValue?: string
}

export const SelectRole: FC<SelectRoleProps> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const { data: roles } = useRoles({ order: 'DESC' })

  const handleValueChange = (value: string) => {
    // if (Array.isArray(companyList)) {
    //   const selectedCompany = companyList.find(
    //     (company: { slug: string; directorSlug: string; name: string }) => company.slug === value
    //   )
    //   if (selectedCompany) {
    //     onChange(selectedCompany.slug, selectedCompany.directorSlug, selectedCompany.name)
    //   }
    // }
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.companyNameDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.companyName')}</SelectLabel>
          {Array.isArray(roles?.items) &&
            roles.items.map((item) => (
              <SelectItem key={item.slug} value={item.slug || ''}>
                {item.nameNormalize}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
