import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { useProjectColumns } from './DataTable/columns'
import { useProjects } from '@/hooks/use-projects'

const Projects: React.FC = () => {
  const { t } = useTranslation(['projects'])

  const { data: projects, isLoading } = useProjects()

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex gap-1 items-center font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('projects.list')}
      </Label>
      <DataTable
        columns={useProjectColumns()}
        data={
          Array.isArray(projects?.result)
            ? projects.result
            : projects?.result
              ? projects.result
              : projects?.result
                ? [projects.result]
                : []
        }
        isLoading={isLoading}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  )
}

export default Projects
