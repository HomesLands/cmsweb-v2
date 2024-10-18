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
import { IAuthority, IUpdateAuthority } from '@/types'
import { useUpdateAuthority } from '@/hooks'
import { TUpdateRoleSchema } from '@/schemas'
import { showToast } from '@/utils'
import { UpdateAuthorityForm } from '@/components/app/form'

export default function DialogUpdateAuthority({ authority }: { authority: IAuthority }) {
  const { mutate: updateAuthorityMutation } = useUpdateAuthority()
  const { t } = useTranslation('authorities')
  const { t: tToast } = useTranslation('toast')
  const handleSubmit = (values: TUpdateRoleSchema) => {
    updateAuthorityMutation(values, {
      onSuccess: () => {
        showToast(tToast('toast.updateAuthoritySuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <SquarePen className="icon" />
          {t('authorities.editAuthority')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('authorities.editAuthority')}</DialogTitle>
          <DialogDescription>{t('authorities.editAuthorityDescription')}</DialogDescription>
        </DialogHeader>
        <UpdateAuthorityForm authority={authority} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
