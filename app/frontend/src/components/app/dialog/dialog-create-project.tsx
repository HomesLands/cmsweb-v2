import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'
import { CreateSiteForm } from '@/components/app/form'
import { useState } from 'react'
import { useCreateSite } from '@/hooks'
import { showToast } from '@/utils'
import { ICreateSite } from '@/types'

export default function DialogCreateSite() {
  const { t } = useTranslation('sites')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createSite } = useCreateSite()

  const handleSubmitCreateSite = (values: ICreateSite) => {
    createSite(values, {
      onSuccess: () => {
        showToast(t('sites.createSiteSuccessfully'))
      }
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 justify-start text-sm w-fit">
          <PlusCircledIcon className="icon" />
          {t('sites.createSite')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[24rem] rounded-md max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('sites.createSite')}</DialogTitle>
          <DialogDescription>{t('sites.createSiteDescription')}</DialogDescription>
        </DialogHeader>
        <CreateSiteForm onSubmitCreateSite={handleSubmitCreateSite} />
      </DialogContent>
    </Dialog>
  )
}
