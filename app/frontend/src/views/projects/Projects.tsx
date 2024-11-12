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
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('projects.list')}
      </Label>
      <DataTable
        columns={useProjectColumns()}
        data={projects?.result || []}
        isLoading={isLoading}
        pages={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  )
}

export default Projects
