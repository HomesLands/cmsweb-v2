import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ICreateProject } from '@/types'
import { showToast } from '@/utils'
import { DialogConfirmCreateProject, DialogCreateProject } from '@/components/app/dialog'
import { useCreateProject } from '@/hooks'
import { CreateProjectForm } from '@/components/app/form'

const CreateProject: React.FC = () => {
  const { t } = useTranslation(['projects'])
  const { t: tToast } = useTranslation(['toast'])
  const { mutate: createProject } = useCreateProject()
  const [openDialog, setOpenDialog] = useState(false)
  const [project, setProject] = useState<ICreateProject | null>(null)

  const handleConfirmCreateProject = (values: ICreateProject) => {
    createProject(values, {
      onSuccess: () => {
        showToast(tToast('toast.createProjectSuccessfully'))
      }
    })
  }

  const onSubmit = (values: ICreateProject) => {
    setProject(values)
    setOpenDialog(true)
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2 w-full sm:grid sm:grid-cols-7">
            <div className="flex flex-col col-span-6 gap-2">
              <CardTitle>{t('projects.createProject')}</CardTitle>
              <CardDescription>{t('projects.createProjectDescription')}</CardDescription>
            </div>
            <div className="flex col-span-1 justify-end">
              <DialogCreateProject />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateProjectForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
      <DialogConfirmCreateProject
        handleCreateProject={handleConfirmCreateProject}
        openDialog={openDialog}
        project={project}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}

export default CreateProject
