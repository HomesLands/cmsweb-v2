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
import { IConstruction } from '@/types'

interface SelectConstructionProps {
  constructionList: IConstruction[]
  onChange: (value: string) => void
}

export const SelectConstruction: FC<SelectConstructionProps> = ({ constructionList, onChange }) => {
  const { t } = useTranslation('productRequisition')

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('product_requisition.construction_site_description')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('product_requisition.construction_site')}</SelectLabel>
          {Array.isArray(constructionList) &&
            constructionList.map((construction) => (
              <SelectItem key={construction.id} value={construction.id}>
                {construction.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
