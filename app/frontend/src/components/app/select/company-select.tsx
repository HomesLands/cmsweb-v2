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
import { useCompanies } from '@/hooks'

interface SelectCompanyProps {
  onChange: (slug: string, name: string) => void
  defaultValue?: string
}

export const SelectCompany: FC<SelectCompanyProps> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const { data: companies } = useCompanies()

  const companyList = companies?.result

  const handleValueChange = (value: string) => {
    if (Array.isArray(companyList)) {
      const selectedCompany = companyList.find(
        (company: { slug: string; name: string }) => company.slug === value
      )
      if (selectedCompany) {
        onChange(selectedCompany.slug, selectedCompany.name)
      }
    }
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.companyNameDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.companyName')}</SelectLabel>
          {Array.isArray(companyList) &&
            companyList.map((company) => (
              <SelectItem key={company.slug} value={company.slug}>
                {company.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
