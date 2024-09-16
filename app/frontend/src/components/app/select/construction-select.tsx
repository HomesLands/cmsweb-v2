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
  onChange: (value: { id: string; name: string }) => void
}

export const SelectConstruction: FC<SelectConstructionProps> = ({ constructionList, onChange }) => {
  const { t } = useTranslation('productRequisition')

  const handleValueChange = (value: string) => {
    const construction = JSON.parse(value)
    onChange(construction)
  }

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.constructionSiteDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.constructionSite')}</SelectLabel>
          {Array.isArray(constructionList) &&
            constructionList.map((construction) => (
              <SelectItem
                key={construction.id}
                value={JSON.stringify({ id: construction.id, name: construction.name })}
              >
                {construction.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
