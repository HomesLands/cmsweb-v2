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
import { useSites } from '@/hooks'

interface SelectSiteProps {
  onChange: (slug: string, name: string) => void
  defaultValue?: string
}

export const SelectSite: FC<SelectSiteProps> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const { data: sites } = useSites()

  const siteList = sites?.result

  const handleValueChange = (value: string) => {
    if (Array.isArray(siteList)) {
      const selectedSite = siteList.find(
        (site: { slug: string; name: string }) => site.slug === value
      )
      if (selectedSite) {
        onChange(selectedSite.slug, selectedSite.name)
      }
    }
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.constructionSiteDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.constructionSite')}</SelectLabel>
          {Array.isArray(siteList) &&
            siteList.map((site) => (
              <SelectItem key={site.slug} value={site.slug}>
                {site.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
