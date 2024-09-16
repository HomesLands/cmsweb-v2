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
  onChange: (value: string) => void
}

export const SelectProject: FC<SelectProjectProps> = ({ projectList, onChange }) => {
  const { t } = useTranslation('productRequisition')

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('product_requisition.project_name_description')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('product_requisition.project_name')}</SelectLabel>
          {Array.isArray(projectList) &&
            projectList.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
