import { FC, useState } from 'react'
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
  onClick?: () => void
  onChange: (slug: string, name: string) => void
  defaultValue?: string
}

export const SelectSite: FC<SelectSiteProps> = ({ onClick, onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const [isOpen, setIsOpen] = useState(false)

  const { data: sites, refetch } = useSites(isOpen)

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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      refetch()
      if (onClick) onClick()
    }
  }

  return (
    <Select
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.selectSiteDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.siteName')}</SelectLabel>
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
