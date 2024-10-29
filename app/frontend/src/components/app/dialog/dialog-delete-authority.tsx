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

import { IAuthority } from '@/types'

import { useDeleteAuthority } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteAuthority({ authority }: { authority: IAuthority }) {
  const { t } = useTranslation('authorities')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteAuthority } = useDeleteAuthority()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (authoritySlug: string) => {
    deleteAuthority(authoritySlug, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteAuthoritySuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('authorities.deleteAuthority')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('authorities.deleteAuthority')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('authorities.deleteAuthorityDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('authorities.deleteAuthorityWarning1')}{' '}
            <span className="font-bold">{authority?.nameDisplay}</span>
            <br /> <br />
            {t('authorities.deleteAuthorityConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('authorities.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => authority && handleSubmit(authority.slug || '')}
          >
            {t('authorities.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
