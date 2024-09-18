import { FC, useEffect } from 'react'
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
  onChange: (value: { slug: string; name: string }) => void
  defaultValue?: { slug: string; name: string }
}

export const SelectConstruction: FC<SelectConstructionProps> = ({
  constructionList,
  onChange,
  defaultValue
}) => {
  const { t } = useTranslation('productRequisition')

  const handleValueChange = (value: string) => {
    const construction = JSON.parse(value)
    onChange({ slug: construction.slug, name: construction.name })
  }

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue)
    }
  }, [defaultValue, onChange])

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={defaultValue ? JSON.stringify(defaultValue) : undefined}
    >
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.constructionSiteDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.constructionSite')}</SelectLabel>
          {Array.isArray(constructionList) &&
            constructionList.map((construction) => (
              <SelectItem
                key={construction.slug}
                value={JSON.stringify({ slug: construction.slug, name: construction.name })}
              >
                {construction.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
