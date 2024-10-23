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

import { UpdateSiteForm } from '@/components/app/form'
import { ISite, IUpdateSite } from '@/types'
import { useUpdateSite } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogUpdateSite({ site }: { site: ISite }) {
  const { t } = useTranslation('sites')
  const { t: tToast } = useTranslation('toast')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateSite } = useUpdateSite()

  const handleSubmit = (values: IUpdateSite) => {
    setIsOpen(false)
    updateSite(values, {
      onSuccess: () => {
        showToast(tToast('toast.updateSiteSuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('sites.updateSite')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('sites.updateSite')}</DialogTitle>
              <DialogDescription>{t('sites.updateSiteDescription')}</DialogDescription>
            </DialogHeader>
            <UpdateSiteForm onSubmit={handleSubmit} data={site} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
