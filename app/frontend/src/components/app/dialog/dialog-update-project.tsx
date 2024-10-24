import { useState } from 'react'
import { SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea
} from '@/components/ui'

import { IProject, IUpdateProject } from '@/types'
import { showToast } from '@/utils'
import { useUpdateProject } from '@/hooks'
import { UpdateProjectForm } from '@/components/app/form'

export default function DialogUpdateProject({ project }: { project: IProject }) {
  const { t } = useTranslation('projects')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateProject } = useUpdateProject()

  const handleSubmit = (values: IUpdateProject) => {
    updateProject(values, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.updateProjectSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('projects.updateProject')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('projects.updateProject')}</DialogTitle>
              <DialogDescription>{t('projects.updateProjectDescription')}</DialogDescription>
            </DialogHeader>
            <UpdateProjectForm onSubmit={handleSubmit} project={project} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
