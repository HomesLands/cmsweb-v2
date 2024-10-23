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

import { ICompany, IUpdateCompany } from '@/types'
import { useUpdateCompany } from '@/hooks'
import { useState } from 'react'
import { SquarePen } from 'lucide-react'
import { UpdateCompanyForm } from '@/components/app/form'
import { showToast } from '@/utils'

export default function DialogUpdateCompany({ company }: { company: ICompany }) {
  const { t } = useTranslation('companies')
  const { t: tToast } = useTranslation('toast')
  const { mutate: updateCompany } = useUpdateCompany()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: IUpdateCompany) => {
    setIsOpen(false)
    updateCompany(data, {
      onSuccess: () => {
        showToast(tToast('toast.updateCompanySuccess'))
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="flex justify-start w-full">
        <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
          <SquarePen className="icon" />
          {t('companies.updateCompany')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('companies.updateCompany')}</DialogTitle>
              <DialogDescription>{t('companies.updateCompanyDescription')}</DialogDescription>
            </DialogHeader>
            <UpdateCompanyForm onSubmit={handleSubmit} company={company} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
