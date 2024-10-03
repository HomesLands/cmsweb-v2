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
import { useProjects } from '@/hooks'

interface SelectProjectProps {
  defaultValue?: string
  onChange: (slug: string, name: string) => void
}

export const SelectProject: FC<SelectProjectProps> = ({ onChange, defaultValue }) => {
  const { t } = useTranslation('productRequisition')
  const { data: projects } = useProjects()

  const projectList = projects?.result

  const handleValueChange = (value: string) => {
    const selectedProject = projectList?.find((project) => project.slug === value)
    if (selectedProject) {
      onChange(selectedProject.slug, selectedProject.name)
    }
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.projectNameDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.projectName')}</SelectLabel>
          {Array.isArray(projectList) &&
            projectList.map((project) => (
              <SelectItem key={project.slug} value={project.slug}>
                {project.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
