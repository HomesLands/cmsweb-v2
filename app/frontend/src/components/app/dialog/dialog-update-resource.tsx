import { useTranslation } from 'react-i18next'
import { SquarePen } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'
import { IResource } from '@/types'
import { useUpdateResource } from '@/hooks'
import { TUpdateResourceSchema } from '@/schemas'
import { showToast } from '@/utils'
import { UpdateResourceForm } from '@/components/app/form'

export default function DialogUpdateResource({ resource }: { resource: IResource }) {
  const { mutate: updateResourceMutation } = useUpdateResource()
  const { t } = useTranslation('resources')
  const { t: tToast } = useTranslation('toast')
  const handleSubmit = (values: TUpdateResourceSchema) => {
    updateResourceMutation(values, {
      onSuccess: () => {
        showToast(tToast('toast.updateResourceSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <SquarePen className="icon" />
          {t('resources.editResource')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('resources.editResource')}</DialogTitle>
          <DialogDescription>{t('resources.editResourceDescription')}</DialogDescription>
        </DialogHeader>
        <UpdateResourceForm resource={resource} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
