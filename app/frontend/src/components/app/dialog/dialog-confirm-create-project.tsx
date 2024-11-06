import { TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'

import { ICreateProject } from '@/types'
import { useTranslation } from 'react-i18next'

interface DialogConfirmCreateProjectProps {
  handleCreateProject: (project: ICreateProject) => void
  openDialog: boolean
  project: ICreateProject | null
  onOpenChange: () => void
}

export function DialogConfirmCreateProject({
  handleCreateProject,
  openDialog,
  project,
  onOpenChange
}: DialogConfirmCreateProjectProps) {
  const { t } = useTranslation('projects')
  const handleSubmit = (data: ICreateProject) => {
    handleCreateProject(data)
    onOpenChange()
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[32rem]">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-primary text-primary">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="w-6 h-6" />
              {t('projects.confirmCreate')}
            </div>
          </DialogTitle>

          <div className="py-4 text-sm text-gray-500">
            {t('projects.confirmCreateDescription')}
            <br />
            <span className="font-bold">{project?.name}</span> {t('projects.belongsToLocation')}{' '}
            <span className="font-bold">{project?.siteName}</span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('projects.cancelCreate')}
          </Button>
          <Button variant="default" onClick={() => project && handleSubmit(project)}>
            {t('projects.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
