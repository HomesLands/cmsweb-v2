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
import { IProject } from '@/types'

interface SelectProjectProps {
  projectList: IProject[]
  onChange: (value: { slug: string; name: string }) => void
  defaultValue?: { slug: string; name: string }
}

export const SelectProject: FC<SelectProjectProps> = ({ projectList, onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')

  const handleValueChange = (value: string) => {
    const project = JSON.parse(value)
    onChange({ slug: project.slug, name: project.name })
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
        <SelectValue placeholder={t('productRequisition.projectNameDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.projectName')}</SelectLabel>
          {Array.isArray(projectList) &&
            projectList.map((project) => (
              <SelectItem
                key={project.slug}
                value={JSON.stringify({ slug: project.slug, name: project.name })}
              >
                {project.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
