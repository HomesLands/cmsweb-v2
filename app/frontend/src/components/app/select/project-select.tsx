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
import { IProject } from '@/types'

interface SelectProjectProps {
  projectList: IProject[]
  onChange: (value: { id: string; name: string }) => void
}

export const SelectProject: FC<SelectProjectProps> = ({ projectList, onChange }) => {
  const { t } = useTranslation('productRequisition')

  // Hàm để parse lại đối tượng từ chuỗi JSON
  const handleValueChange = (value: string) => {
    const project = JSON.parse(value)
    onChange(project)
  }

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('productRequisition.projectNameDescription')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('productRequisition.projectName')}</SelectLabel>
          {Array.isArray(projectList) &&
            projectList.map((project) => (
              <SelectItem
                key={project.id}
                value={JSON.stringify({ id: project.id, name: project.name })}
              >
                {project.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
