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

import { IApiResponse, ICompany, IProject } from '@/types'

import { useDeleteCompany, useDeleteProject } from '@/hooks'
import { showErrorToast, showToast } from '@/utils'
import { AxiosError, isAxiosError } from 'axios'

export default function DialogDeleteCompany({ company }: { company: ICompany }) {
  const { t } = useTranslation('companies')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteCompany } = useDeleteCompany()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (projectSlug: string) => {
    deleteCompany(projectSlug, {
      onSuccess: () => {
        setIsOpen(false)
        showToast(tToast('toast.deleteCompanySuccess'))
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<IApiResponse<void>>
          if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('companies.deleteCompany')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('companies.deleteCompany')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('companies.deleteCompanyDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('companies.deleteCompanyWarning1')}{' '}
            <span className="font-bold">{company?.name}</span> <br />
            <br />
            {t('companies.deleteCompanyConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('companies.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => company && handleSubmit(company.slug || '')}>
            {t('companies.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
