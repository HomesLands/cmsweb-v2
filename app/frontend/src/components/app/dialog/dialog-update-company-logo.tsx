import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { KeyRoundIcon, PenIcon, SquarePen, UserRoundPenIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Card,
  CardContent
} from '@/components/ui'
import { ICompany, IUploadCompanyLogo } from '@/types'
import { useUploadCompanyLogo } from '@/hooks'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores'

import { publicFileURL } from '@/constants'
import { showToast } from '@/utils'

export default function DialogUpdateCompanyLogo({ company }: { company: ICompany }) {
  const { t } = useTranslation('companies')
  const { t: tToast } = useTranslation('toast')
  const { getTheme } = useThemeStore()
  const { mutate: uploadCompanyLogoMutation } = useUploadCompanyLogo()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => fileInputRef.current?.click()

  const handleSubmit = (values: File) => {
    const requestData = {
      file: values,
      slug: company.slug
    } as IUploadCompanyLogo
    uploadCompanyLogoMutation(requestData, {
      onSuccess: () => {
        showToast(tToast('toast.updateCompanyLogoSuccess'))
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <SquarePen className="icon" />
          {t('companies.updateLogo')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>{t('companies.updateLogo')}</DialogTitle>
          <DialogDescription>
            {t('companies.updateLogoDescription')} {company.name}
          </DialogDescription>
        </DialogHeader>
        <Card className="mt-6 border-none">
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-3 border rounded-md">
              <div
                className={cn(
                  'flex justify-between items-center px-6 py-4 w-full',
                  getTheme() === 'light' ? 'bg-gray-50' : ''
                )}
              >
                <span className="font-semibold font-beVietNam text-md">
                  {t('companies.currentLogo')}
                </span>
                {company.logo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={triggerFileInput}
                  >
                    <KeyRoundIcon className="icon" />
                    <span className="text-xs text-normal">{t('companies.changeLogo')}</span>
                  </Button>
                )}
              </div>
              <div className="p-6">
                {company.logo ? (
                  <div className="w-full h-40 overflow-hidden border rounded-md">
                    <img
                      src={`${publicFileURL}/${company.logo}`}
                      alt="User Signature"
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center w-full h-40 text-gray-400 transition-colors border rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={triggerFileInput}
                  >
                    <UserRoundPenIcon className="w-12 h-12 mb-2" />
                    <span className="text-xs">{t('companies.addLogo')}</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleSubmit(file)
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
