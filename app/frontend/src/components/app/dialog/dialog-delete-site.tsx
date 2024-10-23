import { Trash, Trash2, TriangleAlert } from 'lucide-react'

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

import { IDeleteSite, IProductRequisitionInfo, ISite } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteSite } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteSite({ site }: { site: ISite }) {
  const { t } = useTranslation('sites')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteSite } = useDeleteSite()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (siteSlug: string) => {
    setIsOpen(false)
    deleteSite(siteSlug, {
      onSuccess: () => {
        showToast(tToast('toast.deleteSiteSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('sites.deleteSite')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('sites.deleteSite')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('sites.deleteSiteDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('sites.deleteSiteWarning1')} <span className="font-bold">{site?.name}</span>.
            <br />
            <br />
            {t('sites.deleteSiteConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('sites.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => site && handleSubmit(site.slug || '')}>
            {t('sites.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
