import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IProject } from '@/types'

import { useDeleteProject } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteProject({ project }: { project: IProject }) {
  const { t } = useTranslation('projects')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteProject } = useDeleteProject()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (projectSlug: string) => {
    deleteProject(projectSlug, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteProjectSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('projects.deleteProject')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('projects.deleteProject')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('projects.deleteProjectDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('projects.deleteProjectWarning1')} <span className="font-bold">{project?.name}</span>{' '}
            {t('projects.deleteProjectWarning2')}{' '}
            <span className="font-bold">{project?.site.name}</span> <br />
            <br />
            {t('projects.deleteProjectConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('projects.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => project && handleSubmit(project.slug || '')}>
            {t('projects.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
